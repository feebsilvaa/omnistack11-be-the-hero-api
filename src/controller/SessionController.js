const conn = require('../database/connection')


module.exports = {

  async login(req, res) {
    console.debug(`SessionController::login`);
    
    const ong_id = req.body.id;
    if (!ong_id) {
      return res.status(400).json({ error: 'Invalid ONG ID.' });
    }

    const ong = await conn('ongs')
      .where('id', ong_id)
      .select('name')
      .first();

    if (!ong) {
      return res.status(404).json({ error: 'No ONG found with this ID.' });
    }

    return res.json(ong);
  }
}