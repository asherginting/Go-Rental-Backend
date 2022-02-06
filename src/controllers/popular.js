const popularRent = require('../models/popular');

const popularList = (req, res)=>{
    let {vehicle_name, location, cost_min, cost_max, page, limit} = req.query;
    vehicle_name = vehicle_name || '';
    location = location || '';
    cost_min = parseInt(cost_min) || 0;
    cost_max = parseInt(cost_max) || 1000000;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page-1)*limit;
    const data = {vehicle_name, location, cost_min, cost_max, page, limit, offset};
    if(cost_min>=cost_max){
        return res.status(400).send({
            success: false,
            message: 'cost_min should be less than cost_max'
        });
    }
    popularRent.popularList(data, result=>{
        return res.json({
            success: true,
            message: 'List of popular vehicle',
            result: result
        });
    });
};

const popularId = (req, res)=>{
    const {category_id} = req.params;
    let {vehicle_name, location, cost_min, cost_max, page, limit} = req.query;
    vehicle_name = vehicle_name || '';
    location = location || '';
    cost_min = parseInt(cost_min) || 0;
    cost_max = parseInt(cost_max) || 1000000;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page-1)*limit;
    const data = {vehicle_name, location, cost_min, cost_max, page, limit, offset, category_id};
    if(cost_min>=cost_max){
        return res.status(400).send({
            success: false,
            message: 'cost_min should be less than cost_max'
        });
    }
    if(category_id>0){
        popularRent.popularId(data, result=>{
            if(result.length>0){
                return res.json({
                    success: true,
                    message: 'list id',
                    result: result
                });
            }else{
                return res.status(404).send({
                    success: false,
                    message: `Vehicle with ID: ${category_id} not found`
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

const popularByMonth = (req, res)=>{
    let today = new Date();
    const {category_id} = req.params;
    let {month, year, vehicle_name, location, cost_min, cost_max, page, limit,} = req.query;
    month = month || today.getMonth()+1;
    year = year || today.getFullYear();
    vehicle_name = vehicle_name ||'';
    location = location || '';
    cost_min = parseInt(cost_min) || 0;
    cost_max = parseInt(cost_max) || 1000000;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page-1)*limit;
    const data = {month, year, vehicle_name, location, cost_min, cost_max, page, limit, offset, category_id};
    const cb = (results)=>{
        if(results.length>0){
            return res.json({
                success: true,
                message: 'Popular vehicle',
                result: results
            });
        }else{
            return res.status(404).send({
                success: false,
                message: 'Data not found'
            });
        }
    };
    if(cost_min>=cost_max){
        return res.status(400).send({
            success: false,
            message: 'cost_min should be less than cost_max'
        });
    }
    if(category_id==null && category_id==undefined){
        popularRent.popularMonth(data, cb);
    }else{
        popularRent.popularMonthAndCId(data, cb);
    }
};
module.exports = {popularList, popularId, popularByMonth};