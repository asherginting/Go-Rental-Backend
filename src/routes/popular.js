const popular = require('express').Router();

const popularVehicle = require('../controllers/popular');

popular.get('/', popularVehicle);

module.exports = popular;
