const pgp = require('pg-promise')();
const config = require('../../config').getConfig()

const connObject = {
  host: config.db.host,
  port: config.db.port,
  database: config.db.name,
  username: config.db.username,
  password: config.db.password
} 

const db = pgp(connObject)

module.exports = db