const vehicles = require('express').Router();

const {
    getVehicles,
    getVehicle,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getCategory

} = require('../controllers/vehicles');


vehicles.get('/', getVehicles);
vehicles.get('/category/', getCategory);
vehicles.get('/category/:category_id', getCategory);
vehicles.get('/:id', getVehicle);
vehicles.post('/', addVehicle);
vehicles.patch('/', updateVehicle);
vehicles.patch('/:id', updateVehicle);
vehicles.delete('/', deleteVehicle);
vehicles.delete('/:id', deleteVehicle);



module.exports = vehicles;