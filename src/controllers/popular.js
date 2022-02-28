const helperGet = require('../helpers/get');
const populerModel = require('../models/popular');

const popular = (req, res) => {
  helperGet(req, res, populerModel.popularVehicle, populerModel.countPopular, 'popular');
};

module.exports = popular;
