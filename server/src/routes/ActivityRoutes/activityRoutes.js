const {
  getActivities,
} = require('../../Controllers/ControllersActivity/getActivity.js');
const {
  postActivity,
} = require('../../Controllers/ControllersActivity/postActivity.js');

const router = require('express').Router();

router.post('/', postActivity);
router.get('/', getActivities);

module.exports = router;
