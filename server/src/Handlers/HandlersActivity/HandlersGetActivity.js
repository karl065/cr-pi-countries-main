const {
  getActivities,
} = require('../../Controllers/ControllersActivity/getActivityController');

async function getHandlerActivity(req, res) {
  try {
    const activities = await getActivities();
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
}

module.exports = {getHandlerActivity};
