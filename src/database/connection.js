const knex = require('knex');
const dbConfig = require('../../knexfile');

const dbEnv = process.env.NODE_ENV === 'test' ? dbConfig.test : dbConfig.development;

const conn = knex(dbEnv);

module.exports = conn;