const conn = require('../database/connection');
const utils = require('../utils/ControllerUtils');

const INCIDENTS_TABLE = 'incidents';

module.exports = {
  async listIncidents(req, res) {
    let { page = 0, size = 5, listAll = false } = req.query;
    console.debug(`OngProfileController::listIncidents::page=${page}size=${size}`);
    const ong_id = req.headers.authorization;

    if (!ong_id) {
      return res.status(400).json({ error: 'Invalid ong_id' })
    }
    console.log(listAll);
    
    let incidents = []
    if(listAll === 'true') {
      incidents = await conn(INCIDENTS_TABLE)
        .where('ong_id', ong_id)
        .select('*');
    } else {
      incidents = await conn(INCIDENTS_TABLE)
        .where('ong_id', ong_id)
        .limit(size)
        .offset(page *  size)
        .select('*');
    }

    let [total] = await conn(INCIDENTS_TABLE)
      .where('ong_id', ong_id)
      .count('*');
    const pagination = utils.getPaginationInfo(page, size, incidents, total);

    return res.json(utils.getPaginationPresenter(pagination, incidents));
  }
}