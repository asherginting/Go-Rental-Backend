const vehicles = require('express').Router()

const {
    getVehicles,
    getVehicle
} = require('../controllers/vehicles')

vehicles.get('/', getVehicles)
vehicles.get('/:id', getVehicle)


module.exports = vehicles