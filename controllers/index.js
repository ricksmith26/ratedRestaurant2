const pgp = require('pg-promise')({ promiseLib: Promise });
const database = {
  host: 'localhost',
  port: 5432,
  database: 'restaurants_db',
  user: 'ricksmith1983',
  password: 'Pi3141592'
};
const db = pgp(database);

exports.getAreas = (req, res, next) => {
  db.many('SELECT * FROM areas;')
    .then(areas => {
      const areasObj = areas.reduce(function(acc, area) {
        let key = area.area_id;
        if (!acc[key]) {
          acc[key] = {};
        }
        acc[key] = area;
        return acc;
      }, {});

      res.send(areasObj);
    })
    .catch(error => {
      next(error);
    });
};

exports.getRestaurantsByArea = (req, res, next) => {
  const { area_id } = req.params;

  db.many(
    'SELECT * FROM restaurants JOIN areas ON restaurants.area_id = areas.area_id WHERE restaurants.area_id = $1',
    [area_id]
  ).then(restaurantsByArea => {
    let name = restaurantsByArea[0].area_name;
    const restaurants = restaurantsByArea.reduce(function(acc, val) {
      let key = val.restaurant_id;
      acc[key] = val;
      return acc;
    }, {});
    let result = {
      area_id,
      name,
      restaurants
    };
    res.send(result);
  });
};

exports.addRestaurant = (req, res, next) => {
  const { area_id } = req.params;
  const { restaurant_name, cuisine, website } = req.body;

  db.one(
    'INSERT INTO restaurants (restaurant_name, area_id, cuisine, website) VALUES ($1, $2, $3, $4) RETURNING *',
    [restaurant_name, area_id, cuisine, website]
  ).then(data => {
    db.many('SELECT * FROM restaurants WHERE area_id = $1', [area_id])
      .then(restaurants => {
        res.status(201).send({ restaurants });
      })

      .catch(next);
  });
};

exports.getRestaurantComments = (req, res, next) => {
  const { restaurant_id } = req.params;

  db.many(
    'SELECT * FROM comments JOIN restaurants ON restaurants.restaurant_id = comments.restaurant_id WHERE restaurants.restaurant_id = $1',
    [restaurant_id]
  )
    .then(comments => {
      // let area_id = commments[0].area_id;
      // let name = comments[0].restaurant_name;
      // let cuisine = comments[0].cuisine;
      const result = comments.reduce(function(acc, val) {
        let key = val.comment_id;
        acc[key] = val;
        return acc;
      }, {});
      const endResult = {
        restaurant_id: restaurant_id,
        area_id: comments[0].area_id,
        name: comments[0].restaurant_name,
        website: comments[0].website,
        comments: result
      };

      res.send(endResult);
    })
    .catch(next);
};

exports.getRatingsForRestaurant = (req, res, next) => {
  const { restaurant_id } = req.params;

  db.many(
    'SELECT *  FROM ratings JOIN restaurants ON restaurants.restaurant_id = ratings.restaurant_id WHERE restaurants.restaurant_id = $1',
    [restaurant_id]
  ).then(ratings => {
    const ratingObj = ratings.reduce(function(acc, val) {
      let key = val.rating_id;
      if (!acc[key]) acc[key] = val;
      return acc;
    }, {});
    let area_id;

    const result = {
      restaurant_id: ratings[0].restaurant_id,
      area_id: ratings[0].area_id,
      name: ratings[0].restaurant_name,
      website: ratings[0].website,
      ratings: ratingObj
    };
    res.send(result);
  });
};

exports.addCommentToRestaurant = (req, res, next) => {
  const { res_id } = req.params;
  const { restaurant_id, body } = req.body;

  db.one(
    'INSERT INTO comments (restaurant_id, body) VALUES ($1, $2) RETURNING *',
    [restaurant_id, body]
  ).then(data => {
    db.many('SELECT * FROM comments')
      .then(comments => {
        res.status(201).send({ comments });
      })

      .catch(next);
  });
};

exports.addRatingToRestaurant = (req, res, next) => {
  const { res_id } = req.params;
  const { restaurant_id, rating } = req.body;

  db.one(
    'INSERT INTO ratings (restaurant_id, rating) VALUES ($1, $2) RETURNING *',
    [restaurant_id, rating]
  ).then(data => {
    db.many('SELECT * FROM ratings WHERE restaurant_id = $1', [restaurant_id])
      .then(ratings => {
        res.status(201).send({ ratings });
      })

      .catch(next);
  });
};
