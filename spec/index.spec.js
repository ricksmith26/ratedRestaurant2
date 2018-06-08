const app = require('../app');
const request = require('supertest')(app);
const { expect } = require('chai');

describe('/api', () => {
  describe('/areas', () => {
    it('GET responds with a status of 200 an object of areas', () => {
      return request
        .get('/api/areas')
        .expect(200)
        .then(res => {
          expect(res.body).to.eql({
            '1': {
              area_id: 1,
              area_name: 'Manchester'
            },
            '2': {
              area_id: 2,
              area_name: 'Altrincham'
            },
            '3': {
              area_id: 3,
              area_name: 'Chorlton'
            },
            '4': {
              area_id: 4,
              area_name: 'Northern Quater'
            },
            '5': {
              area_id: 5,
              area_name: 'Didsbury'
            }
          });
        });
    });
  });
});
describe('/areas/:area_id', () => {
  it('GET responds with a status of 200 and an object of restaurants from the requested area', () => {
    return request
      .get('/api/areas/3/restaurants')
      .expect(200)
      .then(res => {
        expect(res.body).to.eql({
          area_id: '3',
          name: 'Chorlton',
          restaurants: {
            '4': {
              restaurant_id: 4,
              restaurant_name: 'Subway',
              area_id: 3,
              cuisine: 'American',
              website: 'www.subway.co.uk',
              area_name: 'Chorlton'
            }
          }
        });
      });
  });
});

describe('/areas/:area_id/restaurants', () => {
  it('POST responds with a status code of 201 and an object that includes the new restaurant', () => {
    const newRestaurant = {
      restaurant_name: 'Megamunch',
      area_id: 4,
      cuisine: 'Fastfood',
      website: 'www.megamunch.com'
    };
    return request
      .post('/api/areas/4/restaurants')
      .send(newRestaurant)
      .expect(201)
      .then(res => {
        expect(res.body).to.have.all.keys('restaurants');
        expect(res.body.restaurants[2].restaurant_name).to.equal('Megamunch');
      });
  });
});

describe('/api/restaurants/:restaurant_id/comments', () => {
  it('GET responds with a status code of 200 and an object of comments for the correct restaurant', () => {
    return request
      .get('/api/restaurants/1/comments')
      .expect(200)
      .then(res => {
        expect(res.body).to.include.key('area_id');
        expect(res.body).to.include.key('restaurant_id');
        expect(res.body).to.include.key('name');
        expect(res.body).to.include.key('website');
      });
  });
});

describe('/api/restaurants/:restaurant_id/ratings', () => {
  it('GET responds with a status code of 200 an an object of ratings of the correct restaurant', () => {
    return request
      .get('/api/restaurants/3/ratings')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.an('object');
      });
  });
});

describe('/api/restaurants/:restaurant_id/comments', () => {
  it('POST responds with a status code of 201 and post a comment to the correct restaurant', () => {
    const newComment = {
      restaurant_id: 5,
      body: 'banging grub'
    };
    return request
      .post('/api/restaurants/:restaurant_id/comments')
      .send(newComment)
      .expect(201)
      .then(res => {
        expect(res.body).to.have.all.keys('comments');
        expect(res.body.comments.length).to.equal(9);
      });
  });
});

describe('/api/restaurants/:restaurant_id/ratings', () => {
  it('POST responds with a status code 201 nd posts a rating for the correct restaurant', () => {
    const newRating = {
      restaurant_id: 5,
      rating: 5
    };
    return request
      .post('/api/restaurants/:restaurant_id/ratings')
      .send(newRating)
      .expect(201)
      .then(res => {
        expect(res.body).to.have.all.keys('ratings');
        expect(res.body.ratings.length).to.equal(2);
      });
  });
});

describe('page not found', () => {
  it('GET returns pagge not found and a status code of 404 for ANY INVALID GET PATH', () => {
    return request
      .get('/api/irqrivrnhqiu2')
      .expect(404)
      .then(res => {
        expect(res.body).to.eql({ status: 404, msg: 'page not found' });
      });
  });
});

describe('bad post request', () => {
  it('post returns bad post request and a status code of 400 for ANY INVALID POST PATH', () => {
    return request
      .post('/api/irqrivrnhqiu2')
      .expect(400)
      .then(res => {
        expect(res.body).to.eql({ status: 400, msg: 'bad post request' });
      });
  });
});
