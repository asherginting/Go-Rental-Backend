const vehicles = require('express').Router();

const {
    getVehicles,
    getVehicle,
    addNewVehicle,
    updateVehicle,
    deleteVehicle,
    getPopularVehicles
} = require('../controllers/vehicles');


vehicles.get('/', getVehicles);
vehicles.get('/popular', getPopularVehicles);
vehicles.get('/:id', getVehicle);
vehicles.post('/', addNewVehicle);
vehicles.put('/:id', updateVehicle);
vehicles.delete('/:id', deleteVehicle);



module.exports = vehicles;