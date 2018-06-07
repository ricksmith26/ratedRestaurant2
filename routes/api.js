const apiRouter = require('express').Router();
const { getAreas } = require('../controllers/index');

apiRouter.get('/areas', getAreas);

module.exports = apiRouter;
