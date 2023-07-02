const {Country} = require('../../db.js');
const {Activity} = require('../../db.js');

async function getCountry() {
  return await Country.findAll({
    attributes: {exclude: ['CountryActivity']},
    include: [Activity],
  });
}

async function getCountryById(id) {
  return await Country.findByPk(id, {
    attributes: {exclude: ['CountryActivity']},
    include: [Activity],
  });
}

async function getCountryByName(name) {
  return await Country.findAll({
    where: {nombre: name.toUpperCase()},
    attributes: {exclude: ['CountryActivity']},
    include: [Activity],
  });
}

module.exports = {getCountry, getCountryById, getCountryByName};
