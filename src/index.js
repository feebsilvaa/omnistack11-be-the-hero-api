// importa a biblioteca do express
const express = require('express');

// importando as rotas
const routes = require('./routes');

// importa cors
const cors = require('cors');

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


// escuta a porta 3333 para receber as requisições
app.listen(3333, () => {
  console.debug("Server is running and listening on 3333 port.")
});