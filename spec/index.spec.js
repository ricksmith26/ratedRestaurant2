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
