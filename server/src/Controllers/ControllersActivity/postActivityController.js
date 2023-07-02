const {Activity} = require('../../db.js');
const {Country} = require('../../db.js');

async function postActivity(
  nombre,
  dificultad,
  duracion,
  temporada,
  countryId
) {
  const activity = await Activity.create({
    nombre,
    dificultad,
    duracion,
    temporada,
  });
  const country = await Country.findByPk(countryId);
  await activity.addCountry(country);
  const activityFull = await Activity.findByPk(activity.id, {
    include: [Country],
  });
  return activityFull;
}

module.exports = {postActivity};
