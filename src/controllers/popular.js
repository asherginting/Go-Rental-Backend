const helperGet = require('../helpers/get');
const populerModel = require('../models/popular');
const model = require('../models/vehicles');

const popular = (req, res) => {
    helperGet(req, res, populerModel, model.countVehicle, 'popular');
};

module.exports = popular;
