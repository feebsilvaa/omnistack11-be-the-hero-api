const knex = require('knex');
const dbConfig = require('../../knexfile');

const conn = knex(dbConfig.development);

module.exports = conn;