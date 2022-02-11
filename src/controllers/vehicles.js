const response = require('../helpers/response');
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
    const dataName = ['name', 'location', 'cost_min', 'cost_max'];

    let url = `${APP_URL}/vehicles?`;
    dataName.forEach(x=>{
        if(data[x]){
            url = `${url}${x}=${data[x]}&`;
        }
    });
    console.log(url);
    if(cost_min>=cost_max){
        return response(res, 'cost_max should be more than cost_min', null, 400);
    }
    vehicleModel.getVehicles(data, results=>{
        if(results.length>0){
            vehicleModel.getTotal(data, resultTotal=>{
                if(resultTotal.length>0){
                    const {total} = resultTotal[0];
                    console.log(total);
                    let last = Math.ceil(total/limit);
                    let result = {results,
                        pageInfo: {
                            prev : page > 1 ? `${url}page=${page-1}&limit=${limit}` : null,
                            next : page < last ? `${url}page=${page+1}&limit=${limit}` : null,
                            currentPage : page,
                            lastPage: last
                        }
                    };
                    return response(res, 'List of vehicles', result);
                }else{
                    return response(res, 'Data not found', null, 404);
                }
            });
        }else{
            return response(res, 'Vehicle not found', null, 404);
        }
    });
};

const getVehicle = (req,res)=>{
    const {id} = req.params;
    if(id>0){
        vehicleModel.getVehicle(id, result=>{
            if(result.length>0){
                return response(res, 'Vehicle detail', result[0]);
            }else{
                return response(res, `Vehicle with ID: ${id} not found`, null, 404);
            }
        });
    }else{
        return response(res, 'ID should be a number greater than 0', null, 400);
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
        return response(res, 'cost_max should be more than cost_min', null, 400);
    }
    if(category_id>0){
        vehicleModel.getCategory(data, result=>{
            if(result.length>0){
                return response(res, 'List of vehicles', result);
            }else{
                return response(res, 'Data not found' , null, 404);
            }
        });
    }else{
        return response(res, 'Undefined ID', null, 400);
    }
};

const isNull = (data)=>{
    let yesNull = 0;
    for(let i = 0; i<data.length;i++){
        if(i!=1){
            if(data[i]==null || data[i]==undefined || data[i]==''){
                yesNull++;
                console.log(`${data[i]} is null`);
            }
        }
    }
    return yesNull;
};

const isMatch = (data)=>{
    const dataName = ['name', 'year', 'cost', 'available', 'type', 'seat', 'category_id', 'location'];
    let theType = ['isNaN', 'number', 'number', 'number', 'isNaN', 'number', 'number', 'isNaN'];
    let newData = [];
    let dataError = [];
    for(let i = 0; i<data.length; i++){
        if(i!==1){
            if(data[i]!==null && data[i]!==undefined){
                newData.push(parseInt(data[i]));
            }else{
                newData.push('');
            }
        }
    }
    for(let j=0; j<newData.length;j++){
        if(newData!==''){
            if(theType[j]=='isNaN'){
                if(isNaN(newData[j])===false){
                    dataError.push(`${dataName[j]} must a STRING`);
                }
            }else{
                if(isNaN(newData[j])===true){
                    dataError.push(`${dataName[j]} must a NUMBER`);
                }
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
            const {name, year, cost, qty, type, seat, category_id, location} = req.body;
            let image = '';
            if(req.file){
                image = `${APP_URL}/${req.file.path}`;
            }else{
                return response(res, 'Please upload the image', null, 400);
            }
            const data = [name, image, year, cost, qty, type, seat, category_id, location];
            let a = isNull(data);
            let b = isMatch(data);
            if(a>0){
                return response(res, 'Please fill in all the fields', null, 400);
            }
            if(b.length>0){
                return response(res, b, null, 400);
            }
            vehicleModel.checkVehicle(name, ress=>{
                let itsThere = 0;
                ress.forEach(x=>{
                    if(x.year==year && x.cost==cost){
                        if(x.type==type && x.location==location){
                            itsThere++;
                        }
                    }
                });
                if(itsThere<1){
                    vehicleModel.addVehicle(data, result=>{
                        if(result.affectedRows>0){
                            vehicleModel.getVehicle(result.insertId, results=>{
                                return response(res, 'Successfully add vehicle', results[0]);
                            });
                        }else{
                            return response(res, 'Error: Can\'t add vehicle', null, 500);
                        }
                    });
                }else{
                    return response(res, 'Vehicle already on the list', null, 400);
                }
            });
        }
    });
};

const updateVehicle = (req, res)=>{
    upload(req, res, err=>{
        if(err){
            return res.json({
                success: false,
                message: err.message
            });
        }else{
            const {id} = req.params;
            const {name, year, cost, qty, type, seat, category_id, location} = req.body;
            let image = '';
            if(req.file){
                image = `${APP_URL}/${req.file.path}`;
            }
            const data = [name, image, year, cost, qty, type, seat, category_id, location, id];
            const dataName = ['name', 'image', 'year', 'cost', 'qty', 'type', 'seat', 'category_id', 'location'];
    
            vehicleModel.getVehicle(id, result=>{
                console.log(data);
                console.log(result[0]);
                if(result.length>0){
                    for(let i=0; i<dataName.length;i++){
                        if(data[i]==null || data[i]==undefined || data[i]==''){
                            data[i]=result[0][dataName[i]];
                        }
                    }
                    console.log(data);
                    vehicleModel.checkVehicle(name, ress=>{
                        let itsThere = 0;
                        ress.forEach(x=>{
                            if(x.id!=id && x.year==year && x.cost==cost){
                                if(x.type==type && x.location==location){
                                    itsThere++;
                                }
                            }
                        });
                        if(itsThere<1){
                            vehicleModel.updateVehicle(data, results=>{
                                if(results.affectedRows>0){
                                    vehicleModel.getVehicle(id, ress=>{
                                        if(ress.length>0){
                                            return response(res, 'Successfully update vehicle', ress[0]);
                                        }else{
                                            return response(res, 'Server error: Can\'t get vehicle', null, 500);
                                        }
                                    });
                                }else{
                                    return response(res, 'Server error: Can\'t update vehicle', null, 500);
                                }
                            });
                        }else{
                            return response(res, 'Vehicle already on the list', null, 400);
                        }
                    });
                }else{
                    return response(res, 'Vehicle not found', null, 404);
                }
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
                        if(result.affectedRows>0){
                            return response(res, 'Vehicle was deleted', results[0]);
                        }else{
                            return response(res, 'Server error: Cannot delete vehicle', null, 500);
                        }
                    });
                }else{
                    return response(res, `Vehicle with ID: ${id} not found`, null, 404);
                }
            }else{
                return response(res, 'ID should be a number greater than 0', null, 400);
            }
        }else{
            return response(res, 'Undefined ID', null, 400);
        }
    });
};

module.exports = {getVehicles, getVehicle, getCategory, addVehicle, updateVehicle, deleteVehicle};