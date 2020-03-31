// importa a biblioteca do express
const express = require('express');

// importando as rotas
const routes = require('./routes');

// importa cors
const cors = require('cors');

// requests validation with celebrate
const { errors } = require('celebrate');

// inicia o express
const app = express();

// habilitando cors
app.use(cors());

// Informa ao express que deve trabalhar com json nos corpos de request e response
app.use(express.json());

app.use(routes);

/**
 * BANCO DE DADOS
 * 
 * DRIVER: Utilizando sql SELECT * FROM ...
 * QUERY BUILDER: Utilizando biblioteca,  table('tabela').select('user')...
 * 
 * Utilizar Query builder Knexjs
 * 
 * npx knex init - cria um arquivo para configuracoes com o banco de dados
 */

 app.use(errors());

module.exports = app;