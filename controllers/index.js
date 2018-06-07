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
