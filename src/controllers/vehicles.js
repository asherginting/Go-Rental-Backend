const vehicleModel = require('../models/vehicles')

const getVehicles = (req, res) => {
    vehicleModel.getVehicles(results => {
        return res.json({
            success: true,
            message: 'List Vehicles',
            results: results //menampilkan array of object
            //results: results[0] untuk memanggil data index ke 0, menampilkan object
        })
    })
}

// module.exports = {getVehicles}

const getVehicle = (req, res) => {
    const {
        id
    } = req.params
    vehicleModel.getVehicle(id, results => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: 'Detail Vehicle',
                results: results[0]
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Vehicle Not found'
            })
        }

    })
}

module.exports = {
    getVehicles,
    getVehicle
}