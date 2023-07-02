const {Activity, Country} = require('../../db.js');

async function getActivities() {
  return await Activity.findAll({
    include: [Country],
  });
}

module.exports = {getActivities};
