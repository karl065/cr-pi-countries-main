const {
  getCountry,
  getCountryById,
  getCountryByName,
} = require('../../Controllers/ControllersCountries/getCountryController');

async function getHandlerCountry(req, res) {
  try {
    const countries = await getCountry();
    return res.status(200).json(countries);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

async function getHandlerById(req, res) {
  const {id} = req.params;
  try {
    const countryId = await getCountryById(id);
    return res.status(200).json(countryId);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
}

async function getHandlerByName(req, res) {
  const {name} = req.query;
  try {
    const countryByName = await getCountryByName(name);
    if (countryByName.length !== 0) {
      return res.status(200).json(countryByName);
    }
    return res.status(404).send('El pais no existe en la base de datos');
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

module.exports = {
  getHandlerCountry,
  getHandlerById,
  getHandlerByName,
};
