/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
const vehicleModel = require('../models/vehicles');
const helperGet = require('../helpers/get');
const categoriesModel = require('../models/categories');
const upload = require('../helpers/upload').single('image');
const response = require('../helpers/response');
const deleteImg = require('../helpers/deleteImg');

const getVehicles = (req, res) => {
    helperGet(req, res, vehicleModel.getVehicles, vehicleModel.countVehicle, 'vehicles');
};

const getVehicleCategory = (req, res) => {
    let {
        search, location, minimum, maximum, page, limit,
    } = req.query;
    search = search || '';
    location = location || '';
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 5;
    minimum = Number(minimum) || 0;
    maximum = Number(maximum) || 1000000000;

    const offset = (page - 1) * limit;
    const data = {
        search, location, minimum, maximum, limit, offset,
    };

    vehicleModel.getVehicleCategory(data, (resultsFin) => vehicleModel.countVehicleCategory(data, (count) => {
        const { total } = count[0];
        const last = Math.ceil(total / limit);
        const results = resultsFin;
        const pageInfo = {
            prev: page > 1 ? `http://localhost:5000/vehicles/category/?search=${search}&location=${location}&page=${page - 1}&limit=${limit}` : null,
            next: page < last ? `http://localhost:5000/vehicles/category/?search=${search}&location=${location}&page=${page + 1}&limit=${limit}` : null,
            totalData: total,
            currentPage: page,
            lastPage: last,
        };

        return response(req, res, 'List vehicles', results, pageInfo);
    }));
    // if (resultsFin.length > 0) {
    //   return vehicleModel.countVehicleCategory(data, (count) => {
    //     const { total } = count[0];
    //     const last = Math.ceil(total / limit);
    //     const results = resultsFin;
    //     const pageInfo = {
    //       prev: page > 1 ? `http://localhost:5000/vehicles/category/?search=${search}&filter=${filter}&page=${page - 1}&limit=${limit}` : null,
    //       next: page < last ? `http://localhost:5000/vehicles/category/?search=${search}&filter=${filter}&page=${page + 1}&limit=${limit}` : null,
    //       totalData: total,
    //       currentPage: page,
    //       lastPage: last,
    //     };

    //     return response(req, res, `List vehicles by category ${filter}`, results, pageInfo);
    //   });
    // }
    // return response(req, res, 'Page not found', null, null, 404);
    // );
};

const getVehicle = async (req, res) => {
    const { id } = req.params;
    const results = await vehicleModel.getVehicleAsync(id);
    if (results.length > 0) {
        return response(req, res, 'Detail Vehicle', results[0], null);
    }
    return response(req, res, `Vehicle not found with id ${id}`, null, null, 404);
};

const getNewVehicle = async (req, res) => {
    const result = await vehicleModel.newVehicle();
    if (result.length > 0) {
        return response(req, res, 'New Vehicle', result, null);
    }
    return response(req, res, 'Unexpected error', null, null, 500);
};

const addVehicle = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return response(req, res, err.message, null, null, 400);
        }
        if (req.user.role === 'Admin') {
            const {
                id_category, brand, capacity, location, price, qty,
            } = req.body;
            let image;
            if (req.file) {
                image = req.file.path;
            }
            if (image === undefined) {
                return response(req, res, 'Image not selected', null, null, 400);
            }
            if (id_category && brand && capacity && location && price && qty) {
                return categoriesModel.getCategory(id_category, (checkType) => {
                    if (checkType.length > 0) {
                        const regex = /\D/g;
                        if (!regex.test(price)) {
                            if (!regex.test(qty) && qty > 0) {
                                const typeCategory = checkType[0].type;
                                const resImage = image.replace(/\\/g, '/');
                                const data = {
                                    id_category, type: typeCategory, brand, image: resImage, capacity, location, price, qty,
                                };
                                return vehicleModel.checkVehicle(data, (checkResult) => {
                                    if (checkResult.length > 0) {
                                        return response(req, res, 'Failed to add new vehicle. Data already exists', null, null, 400);
                                    }
                                    return vehicleModel.addVehicle(data, (addRes) => {
                                        vehicleModel.getVehicle(addRes.insertId, (results) => response(req, res, 'Successfully added new vehicle', results[0]));
                                    });
                                });
                            }
                            return response(req, res, 'quantity must be number and more than 1', null, null, 400);
                        }
                        return response(req, res, 'Price must be number', null, null, 400);
                    }
                    return response(req, res, 'id category not available', null, null, 400);
                });
            }
            return response(req, res, 'Failed to add new vehicle, data must be filled', null, null, 400);
        }
        return response(req, res, 'Only admin can add vehicle', null, null, 403);
    });
};

const editAllVehicle = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return response(req, res, err.message, null, null, 400);
        }
        if (req.user.role === 'Admin') {
            const { id } = req.params;
            const {
                id_category, brand, capacity, location, price, qty, rent_count,
            } = req.body;
            let image;
            if (req.file) {
                image = req.file.path;
            }
            if (image === undefined) {
                return response(req, res, 'Image not selected', null, null, 400);
            }
            if (id_category && brand && capacity && location && price && qty && rent_count) {
                return categoriesModel.getCategory(id_category, (checkType) => {
                    if (checkType.length > 0) {
                        const notNum = /\D/g;
                        if (!notNum.test(price) && !notNum.test(qty) && !notNum.test(rent_count)) {
                            const typeCategory = checkType[0].type;
                            const status = Number(qty) > 0 ? 1 : 2;
                            const resImage = image.replace(/\\/g, '/');
                            const dataBody = {
                                id_category, type: typeCategory, brand, image: resImage, capacity, location, price, qty, rent_count, status,
                            };
                            vehicleModel.getVehicle(id, (vehicleData) => deleteImg.rm(vehicleData));
                            return vehicleModel.editAllVehicle(dataBody, id, (results) => {
                                if (results.affectedRows > 0) {
                                    return vehicleModel.getVehicle(id, (vehicle) => response(req, res, 'Edited Succesfully', vehicle[0], null));
                                }
                                return response(req, res, `Failed to edit vehicle with id ${id}`, null, null, 500);
                            });
                        }
                        return response(req, res, 'Price, qty and rent_count must be number', null, null, 400);
                    }
                    return response(req, res, 'id category not available', null, null, 400);
                });
            }
            return response(req, res, `Failed to edit vehicle with id ${id}. Some data is empty.`, null, null, 400);
        }
        return response(req, res, 'Only admin can update vehicle', null, null, 403);
    });
};

const editVehicle = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return response(req, res, err.message, null, null, 400);
        }
        const { id } = req.params;
        return vehicleModel.getVehicle(id, (vehicle) => {
            if (vehicle.length > 0) {
                const data = {};
                const input = ['id_category', 'brand', 'capacity', 'location', 'price', 'qty', 'rent_count'];
                input.forEach((item) => {
                    if (req.body[item] && req.body[item] !== undefined) {
                        data[item] = req.body[item];
                    }
                });
                if (req.file) {
                    data.image = req.file.path.replace(/\\/g, '/');
                }
                if (data.id_category) {
                    categoriesModel.getCategory(data.id_category, (category) => {
                        if (category.length === 0) {
                            return response(req, res, 'id category is not available', null, null, 400);
                        }
                    });
                }
                const pola = /\D/g;
                if (data.price) {
                    if (pola.test(data.price)) {
                        return response(req, res, 'price must be number', null, null, 404);
                    }
                }
                if (data.qty) {
                    if (pola.test(data.qty)) {
                        return response(req, res, 'qty must be number', null, null, 404);
                    }
                }
                if (data.rent_count) {
                    if (pola.test(data.rent_count)) {
                        return response(req, res, 'rent_count must be number', null, null, 404);
                    }
                }

                if (Object.keys(data).length > 0) {
                    return vehicleModel.editAllVehicle(data, id, (results) => {
                        if (results.affectedRows > 0) {
                            return vehicleModel.getVehicle(id, (edited) => response(req, res, 'Data vehicle', edited, null));
                        }
                        return response(req, res, 'Failed to update vehicle', null, null, 500);
                    });
                }
                return response(req, res, 'No data changed on vehicle', null, null, 400);
            }
            return response(req, res, 'Vehicle not available', null, null, 404);
        });
    });
};

const deleteVehicle = (req, res) => {
    if (req.user.role === 'Admin') {
        const { id } = req.params;
        vehicleModel.getVehicle(id, (vehicleDeleted) => {
            vehicleModel.deleteVehicle(id, (results) => {
                if (results.affectedRows > 0) {
                    deleteImg.rm(vehicleDeleted);
                    return response(req, res, `Vehicle with id ${id} successfully deleted`, vehicleDeleted[0], null);
                }
                return response(req, res, `Failed to delete vehicle with id ${id}`, null, null, 500);
            });
        });
    } else {
        return response(req, res, 'Only admin can delete vehicle', null, null, 403);
    }
};

module.exports = {
    getVehicles,
    getVehicleCategory,
    getVehicle,
    getNewVehicle,
    addVehicle,
    editAllVehicle,
    editVehicle,
    deleteVehicle,
};
