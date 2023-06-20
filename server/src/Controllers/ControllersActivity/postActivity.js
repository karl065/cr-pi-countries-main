const {Activity} = require('../../db.js');
const {Country} = require('../../db.js');

async function postActivity(req, res) {
  const {nombre, dificultad, duracion, temporada, countryId} = req.body;
  if (!nombre || !dificultad || !duracion || !temporada) {
    return res.status(401).send('Debe llenar todos los campos');
  }
  try {
    const activity = await Activity.create({
      nombre,
      dificultad,
      duracion,
      temporada,
    });
    const country = await Country.findByPk(countryId);
    await activity.addCountry(country);
    return res.status(200).json(activity);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

module.exports = {postActivity};
