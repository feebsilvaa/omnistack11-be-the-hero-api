// importa a biblioteca do express
const express = require('express');

const { celebrate, Joi, Segments } = require('celebrate');

const OngController = require('./controller/OngController');
const IncidentController = require('./controller/IncidentController');
const OngProfileController = require('./controller/OngProfileController');
const SessionController = require('./controller/SessionController');

// desacopla o modulo de rotas
const routes = express.Router();

// session
routes.post('/session', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  })
}), SessionController.login);

// Ong
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2).message("UF deve conter 2 caracteres"),
  }),
}), OngController.create);

routes.get('/ongs', OngController.list);

// Profile
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
    size: Joi.number(),
  }),
}), OngProfileController.listIncidents);

// Incidents
routes.post('/incidents', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required().min(0),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown()
}), IncidentController.create);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
    size: Joi.number(),
  }),
}), IncidentController.list);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown()
}), IncidentController.delete);

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