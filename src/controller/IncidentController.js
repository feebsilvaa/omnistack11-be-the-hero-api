const conn = require('../database/connection');
const utils = require('../utils/ControllerUtils');

const TABLE_NAME = 'incidents as i';

module.exports = {

  async list(req, res) {
    let { page = 0, size = 5 } = req.query;
    console.debug(`IncidentController::list::page=${page}::size=${size}`);

    let incidents = await conn(TABLE_NAME)
      .innerJoin('ongs as o', 'o.id', 'i.ong_id')
      .limit(size)
      .offset(page * size)
      .select([
        'i.*',
        'o.name',
        'o.email',
        'o.whatsapp',
        'o.city',
        'o.uf'
      ]);

    let [total] = await conn(TABLE_NAME).count('*');
    const pagination = utils.getPaginationInfo(page, size, incidents, total);

    // colocando informações da paginação no header
    res.header('X-Total-Count', total['count(*)']);

    // colocando informações da paginação do response body
    return res.json(utils.getPaginationPresenter(pagination, handleOngIncidentJoinResult(incidents)));
  },
  
  async getById(req, res) {
    const id = req.params.id;
    console.debug(`IncidentController::getById::id${id}`);
    const incidents = await conn(TABLE_NAME).select('*').where('id', id);
    return res.json(incidents);
  },

  async create(req, res) {
    console.debug(`IncidentController::create`);
    // recupera o objeto do request body
    const { title, description, value } = req.body;
    // recupera o id da ong enviado no header
    const ong_id = req.headers.authorization;

    if (!ong_id) {
      return res.status(400).json({ error: 'Invalid ong_id' })
    }

    // salva um novo caso
    const [id] = await conn(TABLE_NAME).insert({
      title, description, value, ong_id
    });

    // retorna o caso salvo
    const [createdIncident] = await conn(TABLE_NAME).select('*').where('id', id);
    return res.json(createdIncident);
  },

  async delete(req, res) {
    console.debug(`IncidentController::delete`);
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await conn(TABLE_NAME)
      .select('ong_id')
      .where('id', id)
      .first();

    if (!incident) {
      return res.status(404).json({ error: 'Resource not found.' });
    }

    if (incident.ong_id != ong_id) {
      return res.status(401).json({ error: 'Operation not permitted.' });
    }

    await conn(TABLE_NAME).delete().where('id', id);
    return res.status(204).send();
  }
}

handleOngIncidentJoinResult = (results) => {
  return results.map((inc) => {
    const { id, title, description, value, ong_id, name, email, whatsapp, city, uf } = inc; 
    return { 
      incident: {
        id, title, description, value,
        ong: { ong_id, name, email, whatsapp, city, uf,
        }
      }
    };
  });
}