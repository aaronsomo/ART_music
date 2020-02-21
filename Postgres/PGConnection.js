const { Client } = require('pg');
const config = require('../config/postgresConfig.js');
const connectionString = `postgres://${config.ip}/${config.database}`;

const db = new Client({
  connectionString: connectionString
});

db.connect()
  .then(() => console.log('Connected to database pixie'))
  .catch(err => console.error('connection error', err.stack));

module.exports = db;
