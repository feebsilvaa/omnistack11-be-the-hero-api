const conn = require('../database/connection');
const crypto = require('crypto');

const TABLE_NAME = 'ongs';

module.exports = {
  async list (req, res) {
    console.debug(`OngController::list`);
    const ongs = await conn.table(TABLE_NAME).select('*');
    return res.json(ongs);
  },

  async create (req, res) {
    console.debug(`OngController::create`);
    const { name, email, whatsapp, city, uf } = req.body;

    if (!name || !email || !whatsapp || !city || !uf) 
      return res.status(412).json({ erro: "Todos os campos são obrigatórios." });
    

    const id = crypto.randomBytes(4).toString('HEX');

    await conn(TABLE_NAME).insert({
      id, name, email, whatsapp, city, uf
    });
    const [savedOng] = await conn(TABLE_NAME).select('*').where('id', id);
    return res.json(savedOng);
  }
}