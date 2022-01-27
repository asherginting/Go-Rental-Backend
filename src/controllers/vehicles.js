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


const addNewVehicle = (req, res) => {
  const data = {
    brand: req.body.brand,
    price: req.body.price,
    isAvailable: req.body.isAvailable,
  }

  vehicleModel.insertVehicle(data, results => {
    console.log(results);
    return res.status(201).json({
      success: true,
      message: `New Vehicle Successfull`,
    })
  })
}

const updateVehicle = (req, res) => {
  const {
    id
  } = req.params

  const data = {
    brand: req.body.brand,
    price: req.body.price,
    isAvailable: req.body.isAvailable,
  }

  vehicleModel.updateVehicle(id, data, results => {
    if (results.affectedRows < 1) {
      return res.status(404).json({
        success: false,
        message: `Vehicle with id ${id} not found`,
      })
    }
    return res.status(200).json({
      success: true,
      message: `Vehicle update successful ID ${id}`,
    })
  })
}

const deleteVehicle = (req, res) => {
  const {
    id
  } = req.params

  vehicleModel.deleteVehicle(id, results => {
    if (results.affectedRows < 1) {
      return res.status(404).json({
        success: false,
        message: `Vehicle with id ${id} not found`,
      })
    }
    return res.status(200).json({
      success: true,
      message: `Vehicle delete successful ID ${id}`,
    })
  })
}

module.exports = {
  getVehicles,
  getVehicle,
  addNewVehicle,
  updateVehicle,
  deleteVehicle
}