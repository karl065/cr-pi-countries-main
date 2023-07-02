const {
  getHandlerActivity,
} = require('../../Handlers/HandlersActivity/HandlersGetActivity.js');
const {
  postHandlerActivity,
} = require('../../Handlers/HandlersActivity/HandlresPostActivity.js');

const router = require('express').Router();

router.post('/', postHandlerActivity);
router.get('/', getHandlerActivity);

module.exports = router;
