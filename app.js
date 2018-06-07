const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send({ msg: 'Welcome to my homepage' });
});

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log(err, 'Err sent upto error handler...');
});
module.exports = app;
