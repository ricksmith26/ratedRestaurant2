const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send({ msg: 'Welcome to my homepage' });
});

app.use('/api', apiRouter);

app.get('/*', (req, res, next) => {
  next({ status: 404, msg: 'page not found' });
});

app.post('/*', (req, res, next) => {
  next({ status: 400, msg: 'bad post request' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.send(err);
});
module.exports = app;
