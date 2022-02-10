const vehicleModel = require('../models/vehicles');
const {APP_URL} = process.env;
const upload = require('../helpers/upload').single('image');

const getVehicles = (req, res)=>{
    let {name, location, cost_min, cost_max, page, limit} = req.query;
    name = name || '';
    location = location || '';
    cost_min = parseInt(cost_min) || 0;
    cost_max = parseInt(cost_max) || 1000000;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page-1)*limit;
    const data = {name, location, cost_min, cost_max, page, limit, offset};
    if(cost_min>=cost_max){
        return res.status(400).send({
            success: false,
            message: 'cost_min should be less than cost_max'
        });
    }
    vehicleModel.getVehicles(data, results=>{
        if(results.length>0){
            return res.json({
                success: true,
                message: 'List of Vehicles',
                result : results
            });
        }else{
            return res.status(404).send({
                success: false,
                message: 'Vehicle not found'
            });
        }
    });
};

const getVehicle = (req,res)=>{
    const {id} = req.params;
    if(id>0){
        vehicleModel.getVehicle(id, results=>{
            if(results.length>0){
                return res.json({
                    success: true,
                    message: 'Vehicle details',
                    result: results[0]
                });
            }else{
                return res.status(404).send({
                    success: false,
                    message: `Vehicle with ID: ${id} not found`
                });
            }
        });
    }else{
        return res.status(400).send({
            success: false,
            message: 'ID should be a number greater than 0'
        });
    }
};

const getCategory = (req, res)=>{
    const {category_id} = req.params;
    let {name, location, cost_min, cost_max, page, limit} = req.query;
    name = name || '';
    location = location || '';
    cost_min = parseInt(cost_min) || 0;
    cost_max = parseInt(cost_max) || 1000000;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page-1)*limit;
    const data = {name, location, cost_min, cost_max, page, limit, offset, category_id};
    if(cost_min>=cost_max){
        return res.status(400).send({
            success: false,
            message: 'cost_min should be less than cost_max'
        });
    }
    if(category_id>0){
        vehicleModel.getCategory(data, result=>{
            if(result.length>0){
                return res.json({
                    success: true,
                    message: 'List of vehicles',
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
            message: 'Undefined ID'
        });
    }
};

const isNull = (data)=>{
    let notNull = 0;
    for(let i = 0; i<data.length;i++){
        if(data[i]==null || data[i]==undefined || data[i]==''){
            notNull++;
        }
    }
    return notNull;
};

const isMatch = (data)=>{
    const dataName = ['name', 'year', 'cost', 'available', 'type', 'seat', 'category_id', 'location'];
    let theType = ['isNaN', 'number', 'number', 'number', 'isNaN', 'number', 'number', 'isNaN'];
    let newData = [];
    let dataError = [];
    for(let i = 0; i<data.length; i++){
        newData.push(parseInt(data[i]));
        if(theType[i]=='isNaN'){
            if(isNaN(newData[i])===false){
                dataError.push(`${dataName[i]} must a STRING`);
            }
        }else{
            if(isNaN(newData[i])===true){
                dataError.push(`${dataName[i]} must a NUMBER`);
            }
        }
    }
    return dataError;
};

const addVehicle = (req,res)=>{
    upload(req, res, err=>{
        if(err){
            return res.json({
                success: false,
                message: err.message
            });
        }else{
            const {name, year, cost, available, type, seat, category_id, location} = req.body;
            let image = '';
            if(req.file){
                image = req.file.path;
            }else{
                return res.status(400).send({
                    success: false,
                    message: 'Please upload the image!'
                });
            }
            const data = [name, image, year, cost, available, type, seat, category_id, location];
            let a = isNull(data);
            let b = isMatch(data);
            if(a>0){
                return res.status(400).send({
                    success: false,
                    message: 'Please fill in all the fields.'
                });
            }
            if(b.length>0){
                return res.status(400).send({
                    success: false,
                    message: b
                });
            }
            vehicleModel.checkVehicle(name, ress=>{
                let itsThere = 0;
                ress.forEach(x=>{
                    if(x.year==year && x.cost==cost && x.type==type && x.location==location){
                        itsThere++;
                    }
                });
                if(itsThere<1){
                    vehicleModel.addVehicle(data, result=>{
                        if(result.affectedRows>0){
                            vehicleModel.getVehicle(result.insertId, results=>{
                                return res.json({
                                    success: true,
                                    message: 'Successfully add vehicle to the list',
                                    result: results[0]
                                });
                            });
                        }else{
                            return res.status(500).send({
                                success: false,
                                message: 'Error: cannot add vehicle'
                            });
                        }
                    });
                }else{
                    return res.status(400).send({
                        success: false,
                        message: 'Vehicle already on the list'
                    });
                }
            });
        }
    });
};

const updateVehicle = (req, res)=>{
    const {id} = req.params;
    const {name, year, cost, qty, type, seat, category_id, location} = req.body;
    let gb = req.file;
    let image = '';
    if(gb!==null && gb!==undefined){
        image = gb.path;
        image = `${APP_URL}/${image}`;
    }
    const data = [name, image, year, cost, qty, type, seat, category_id, location, id];
    const dataName = ['name', 'image', 'year', 'cost', 'qty', 'type', 'seat', 'category_id', 'location'];
  
    vehicleModel.getVehicle(id, result=>{
        if(result.length>0){
            for(let i=0; i<dataName.length;i++){
                if(data[i]==null || data[i]==undefined || data[i]==''){
                    data[i]=result[0][dataName[i]];
                }
            }
            console.log(data);
            vehicleModel.updateVehicle(data, results=>{
                if(results.affectedRows>0){
                    vehicleModel.getVehicle(id, ress=>{
                        return res.json({
                            success: true,
                            message: 'Successfully update vehicle',
                            result: ress[0]
                        });
                    });
                }
            });
        }else{
            return res.status(404).send({
                success: false,
                message: `Vehicle with ID: ${id} not found`
            });
        }
    });
};

const deleteVehicle = (req, res)=>{
    const {id} = req.params;
    vehicleModel.getVehicle(id, results=>{
        if(id!==null && id!==undefined){
            if(id>0){
                if(results.length>0){
                    vehicleModel.deleteVehicle(id, result=>{
                        return res.send({
                            success: true,
                            message: 'Deleted',
                            result: `Affected Rows ${result.affectedRows}`
                        });
                    });
                }else{
                    return res.status(404).send({
                        success: false,
                        message: `Vehicle with ID: ${id} not found`
                    });
                }
            }else{
                return res.status(400).send({
                    success: false,
                    message: 'ID should be a number greater than 0'
                });
            }
        }else{
            return res.status(400).send({
                success: false,
                message: 'Undefined ID'
            });
        }
    });
};

module.exports = {getVehicles, getVehicle, getCategory, addVehicle, updateVehicle, deleteVehicle};