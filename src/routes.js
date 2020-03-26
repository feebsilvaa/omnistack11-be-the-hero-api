// importa a biblioteca do express
const express = require('express');

const OngController = require('./controller/OngController');
const IncidentController = require('./controller/IncidentController');
const OngProfileController = require('./controller/OngProfileController');
const SessionController = require('./controller/SessionController');

// desacopla o modulo de rotas
const routes = express.Router();

// session
routes.post('/session', SessionController.login);

// Ong
routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.list);

// Profile
routes.get('/profile', OngProfileController.listIncidents);

// Incidents
routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.list);
routes.delete('/incidents/:id', IncidentController.delete);

// EXEMPLOS
// // Query params
// routes.get('/users-query', (req, res) => {
//   let query = req.query;
//   console.log(query);
//   return res.json({
//     message: 'Hello ' + query.name
//   });
// });

// // Route params
// routes.get('/users-route/:name', (req, res) => {
//   let params = req.params;
//   console.log(params);
//   return res.json({
//     message: 'Hello ' + params.name
//   });
// });

// // Body params
// routes.post('/users-body', (req, res) => {
//   let body = req.body;
//   console.log(body);
//   return res.json({
//     message: 'Hello ' + body.name
//   });
// });

module.exports = routes;