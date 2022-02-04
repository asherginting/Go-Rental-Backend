const vehicleModel = require('../models/vehicles');
const {baseURL} = require ('../helpers/url');
const {dataValidator} = require ('../helpers/requestHandler');
const {returningSuccess, returningError, pageCreator} = require ('../helpers/responseHandler');

// const getVehicles = (req, res) => {
//     const { search } = req.query;
//     vehicleModel.getVehicles(search, (results) => {
//         return res.json({
//             success: true,
//             message: 'List Vehicles',
//             results: results //menampilkan array of object
//             //results: results[0] untuk memanggil data index ke 0, menampilkan object
//         });
//     });
// };

const getVehicles = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const search = req.query.search || '';
        const offset = (page - 1) * limit;

        const pageLink = pageCreator(`${baseURL}/vehicles?`, {
            page,
            limit,
            search
        });
        const results = await vehicleModel.getVehicles(limit, offset, search);

        const countData = await vehicleModel.countData();
        const totalData = countData[0].row;

        const lastPage = search ? Math.ceil(results.length / limit) : Math.ceil(totalData / limit);
        return res.json({
            success: true,
            message: 'List of vehicles',
            results,
            pageInfo: {
                totalData: search ? results.length : totalData,
                currentPage: page,
                nextPage: page < lastPage ? pageLink.next : null,
                prevPage: page > 1 ? pageLink.prev : null,
                lastPage
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const getVehicle = (req, res) => {
    const {
        id
    } = req.params;
    vehicleModel.getVehicle(id, (results) => {
        if (results.length < 1) {
            return res.status(404).json({
                success: false,
                message: `Vehicle with id ${id} not found`
            });
        } 
        return res.status(200).json({
            success: true,
            message: `Success getting vehicle with id ${id}`,
            result: results[0]
        });
        
    });
};


const addNewVehicle = (req, res) => {
    const data = {
        name: req.body.name,
        price: Number(req.body.price),
        type: req.body.type,
        qty: Number(req.body.qty),
        location: req.body.location
    };

    console.log(data);

    if (!dataValidator(data)) {
        return res.status(400).json({
            success: false,
            message: 'Your data not validate',
        });
    }

    vehicleModel.checkExistVehicle(data, (checkResults) => {
        if (checkResults.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Vehicle already exist',
            });
        }

        vehicleModel.insertVehicle(data, (results) => {
            console.log(results);
            return res.status(201).json({
                success: true,
                message: 'New Vehicle Successfull',
            });
        });
    });
};

const updateVehicle = (req, res) => {
    const {
        id
    } = req.params;

    const data = {
        name: req.body.name,
        price: Number(req.body.price),
        type: req.body.type,
        qty: Number(req.body.qty),
        location: req.body.location
    };

    // validator data
    if (!dataValidator(data)) {
        return res.status(400).json({
            success: false,
            message: 'Your data not validate',
        });
    }

    vehicleModel.checkExistVehicle(data, (checkResults) => {
        // check if the data is changed or not
        if (checkResults.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Vehicle with inputed data already exist',
            });
        }

        vehicleModel.updateVehicle(id, data, (results) => {
            if (results.affectedRows < 1) {
                return res.status(404).json({
                    success: false,
                    message: `Vehicle with id ${id} not found`,
                });
            }
            return res.status(200).json({
                success: true,
                message: `Vehicle update successful ID ${id}`,
            });
        });
    });
};


const deleteVehicle = (req, res) => {
    const {
        id
    } = req.params;

    vehicleModel.deleteVehicle(id, (results) => {
        if (results.affectedRows < 1) {
            return res.status(404).json({
                success: false,
                message: `Vehicle with id ${id} not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Vehicle delete successful ID ${id}`,
        });
    });
};

const getPopularVehicles = async (req, res) => {
    try {
        const results = await vehicleModel.getPopularVehicles();
        return returningSuccess(res, 200, 'List of popular vehicles', results);
    } catch (error) {
        console.log(error);
        return returningError(res, error, 'Failed to get popular vehicles');
    }
};

const getVehicleCategory = (req, res) => {
    const { category } = req.query;
    vehicleModel.getVehicleCategory(category, (results) => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: 'Vehicles by category',
                results,
            });
        }
        return res.status(404).json({
            success: false,
            message: `Vehicle with category ${category} not found`,
        });
    });
};

module.exports = {
    getVehicles,
    getVehicle,
    addNewVehicle,
    updateVehicle,
    deleteVehicle,
    getPopularVehicles,
    getVehicleCategory
};