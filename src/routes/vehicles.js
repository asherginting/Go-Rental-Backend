const vehicles = require('express').Router();
const upload = require('../helpers/upload');
const {verifyUser} = require('../helpers/auth');

const {
    getVehicles,
    getVehicle,
    addVehicle,
    updateVehicle,
    deleteVehicle,
} = require('../controllers/vehicles');


vehicles.get('/', getVehicles);
vehicles.get('/:id', getVehicle);
vehicles.post('/', verifyUser, upload.single('image'), addVehicle);
vehicles.patch('/', verifyUser, updateVehicle);
vehicles.patch('/:id', verifyUser, upload.single('image'), updateVehicle);
vehicles.delete('/', verifyUser, deleteVehicle);
vehicles.delete('/:id', verifyUser, deleteVehicle);



module.exports = vehicles;