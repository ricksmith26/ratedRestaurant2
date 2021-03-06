const apiRouter = require('express').Router();
const {
  getAreas,
  getRestaurantsByArea,
  addRestaurant,
  getRestaurantComments,
  getRatingsForRestaurant,
  addCommentToRestaurant,
  addRatingToRestaurant,
  badGetRequest
} = require('../controllers/index');

apiRouter.get('/areas', getAreas);

apiRouter.get('/areas/:area_id/restaurants', getRestaurantsByArea);

apiRouter.post('/areas/:area_id/restaurants', addRestaurant);

apiRouter.get('/restaurants/:restaurant_id/comments', getRestaurantComments);

apiRouter.get('/restaurants/:restaurant_id/ratings', getRatingsForRestaurant);

apiRouter.post('/restaurants/:restaurant_id/comments', addCommentToRestaurant);

apiRouter.post('/restaurants/:restaurant_id/ratings', addRatingToRestaurant);

module.exports = apiRouter;
