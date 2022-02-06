const rentHistories = require('../models/histories');
const vehicles = require('../models/vehicles');
const users = require('../models/users');

const getHistories = (req, res)=>{
    let {vehicle_name, page, limit} = req.query;
    vehicle_name = vehicle_name || '';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page-1)*limit;
    const data = {vehicle_name, page, limit, offset};
    rentHistories.getHistories(data, results=>{
        return res.json({
            success: true,
            message: 'Histories',
            result: results
        });
    });
};

const getHistory = (req, res)=>{
    const {id} = req.params;
    rentHistories.getHistory(id, results=>{
        if(results.length>0){
            return res.json({
                success: true,
                message: `Rent history with ID: ${id}`,
                result: results[0]
            });
        }else{
            return res.status(404).send({
                success: false,
                message: `ID: ${id} not found`
            });
        }
    });
};

const getHistoryId = (req, res)=>{
    const {vehicle_id} = req.params;
    let {page, limit} = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page-1)*limit;
    const data = {page, limit, offset, vehicle_id};
    if(vehicle_id!==null || vehicle_id!==undefined){
        if(vehicle_id>0){
            rentHistories.getHistoryId(data, result=>{
                if(result.length>0){
                    return res.json({
                        success: true,
                        message: `History rent with vehicle_id=${vehicle_id}`,
                        result: result
                    });
                }else{
                    return res.status(404).send({
                        success: false,
                        message: 'Vehicle not found'
                    });
                }
            });
        }else{
            return res.status(400).send({
                success: false,
                message: 'vehicle_id should be a number greater than 0.'
            });
        }
    }else{
        return res.status(400).send({
            success: false,
            message: 'Undefined ID'
        });
    }
};

const isNull = (data)=>{
    let a = 0;
    for(let i=0; i<data.length;i++){
        if(data[i]==''){
            a++;
        }
    }
    return a;
};

const dataType = (data)=>{
    const dataName = ['vehicle_id', 'user_id', 'prepayment', 'rent_date', 'return_date'];
    const dataThrow = [];
    const dataError = [];
    for(let i=0; i<dataName.length;i++){
        if(i<3){
            dataThrow.push(parseInt(data[i]));
        }else{
            dataThrow.push(data[i].toString());
        }
    }
    for(let j=0; j<dataName.length;j++){
        if(j<3 && isNaN(dataThrow[j])==true){
            dataError.push(`${dataName[j]} should be a number`);
        }else if(j>=3){
            if(data[j].length<10){
                dataError.push(`${dataName[j]} is invalid date.`);
            }
            else{
                let a = new Date(data[j]);
                if(a=='Invalid Date'){
                    dataError.push(`${dataName[j]} is invalid date.`);
                }
            }
        }
    }
    return dataError;
};

const addHistories = (req, res)=>{
    const {vehicle_id, user_id, prepayment, rent_date, return_date} = req.body;
    const data = [vehicle_id, user_id, prepayment, rent_date, return_date];
    let b = isNull(data);
    let c = dataType(data);
    const cb = (resAdd)=>{
        rentHistories.getHistVId(vehicle_id, resGetId=>{
            rentHistories.editHistory(vehicle_id, ress=>{
                if(resAdd.affectedRows>0 && resGetId.length>0 && ress.affectedRows>0){
                    return res.json({
                        success: true,
                        message: 'Successfully add histories.',
                        result : resGetId[resGetId.length-1]
                    });
                }else{
                    return res.status(500).send({
                        success: false,
                        message: 'Server error.'
                    });
                }
            });
        });
    };
    if(b>0){
        return res.status(400).send({
            success: false,
            message: 'Please fill in all the fields.'
        });
    }
    if(c.length>0){
        return res.status(400).send({
            success: false,
            message: c
        });
    }
    vehicles.getVehicle(vehicle_id, result=>{
        if(result.length>0){
            if(result[0].available>0){
                users.getUser(user_id, resUser=>{
                    if(resUser.length>0){
                        rentHistories.addHistories(data, cb);
                    }else{
                        return res.status(404).send({
                            success: false,
                            message: `User with ID: ${user_id} not found`
                        });
                    }
                });
            }else{
                return res.status(400).send({
                    success: false,
                    message: 'Vehicle not available at the time.'
                });
            }
        }else{
            return res.status(404).send({
                success: false,
                message: `Vehicle with ID: ${vehicle_id} not found.`
            });
        }
    });
};

const updateHistory = (req, res)=>{
    const {id} = req.params;
    const {vehicle_id, user_id, prepayment, rent_date, return_date} = req.body;
    const data = [vehicle_id, user_id, prepayment, rent_date, return_date, id];
    let b = isNull(data);
    let c = dataType(data);
    if(b>0){
        return res.status(400).send({
            success: false,
            message: 'Please fill in all the fields.'
        });
    }
    if(c.length>0){
        return res.status(400).send({
            success: false,
            message: c
        });
    }
};

const deleteHistory = (req, res)=>{
    const {id} = req.params;
    if(id!==null && id!==undefined){
        rentHistories.getHistory(id, results=>{
            if(results.length>0){
                rentHistories.deleteHistory(id, result=>{
                    return res.json({
                        success: true,
                        message: `History with ID: ${id} was deleted`,
                        result: `Rows affected: ${result.affectedRows}`
                    });
                });
            }else{
                return res.status(404).send({
                    success: false,
                    message: `ID: ${id} not found`
                });
            }
        });
    }else{
        return res.status(400).send({
            success: false,
            message: 'Undefined ID'
        });
    }
};

module.exports = {getHistories, getHistory, getHistoryId, addHistories, updateHistory, deleteHistory};