const vehicles = require('express').Router();

const {
    getVehicles,
    getVehicle,
    addNewVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicleCategory
} = require('../controllers/vehicles');


vehicles.get('/', getVehicles);
vehicles.get('/category', getVehicleCategory);
vehicles.get('/:id', getVehicle);
vehicles.post('/', addNewVehicle);
vehicles.put('/:id', updateVehicle);
vehicles.delete('/:id', deleteVehicle);



module.exports = vehicles;