const app = require('./app');
const pgp = require('pg-promise')({ promiseLib: Promise });

app.listen(9090, () => {
  console.log('App is listeing...');
});
