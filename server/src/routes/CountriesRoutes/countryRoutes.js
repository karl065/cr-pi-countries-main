const express = require('express');
const {
  getCountry,
  getCountryById,
  getCountryByName,
} = require('../../Controllers/ControllersCountries/getCountry');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    getCountryByName(req, res, next);
  } else {
    getCountry(req, res, next);
  }
});
router.get('/:id', getCountryById);

module.exports = router;
