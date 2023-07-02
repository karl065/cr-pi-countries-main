const express = require('express');
const {
  getHandlerCountry,
  getHandlerById,
  getHandlerByName,
} = require('../../Handlers/HandlresCountry/HandlersCountry.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    getHandlerByName(req, res, next);
  } else {
    getHandlerCountry(req, res, next);
  }
});
router.get('/:id', getHandlerById);

module.exports = router;
