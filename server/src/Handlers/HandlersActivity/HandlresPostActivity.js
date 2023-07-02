const {
  postActivity,
} = require('../../Controllers/ControllersActivity/postActivityController');

async function postHandlerActivity(req, res) {
  const {nombre, dificultad, duracion, temporada, countryId} = req.body;
  if (!nombre || !dificultad || !duracion || !temporada || !countryId) {
    return res.status(401).send('Debe llenar todos los campos');
  }
  try {
    const activity = await postActivity(
      nombre,
      dificultad,
      duracion,
      temporada,
      countryId
    );
    return res.status(200).json(activity);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

module.exports = {postHandlerActivity};
