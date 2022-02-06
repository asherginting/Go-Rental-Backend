const vehicleCategories = require('../models/categories');

const getCategories = (req, res)=>{
    vehicleCategories.getCategories(results=>{
        return res.json({
            success: true,
            message: 'List of vehicle\'s categories',
            result: results
        });
    });
};

const getCategory = (req, res)=>{
    const {id} = req.params;
    vehicleCategories.getCategory(id, result=>{
        if(result.length>0){
            return res.json({
                success: true,
                message: `Vehicle category with ID: ${id}`,
                result: result
            });
        }else{
            return res.status(404).send({
                success: false,
                message: `ID:${id} not found`
            });
        }
    });
};

const addCategory = (req, res)=>{
    const {category} = req.body;
    vehicleCategories.checkCategory(category, results=>{
        if(results.length<1){
            vehicleCategories.addCategory(category, result=>{
                vehicleCategories.checkCategory(category, ress=>{
                    return res.json({
                        success: true,
                        message: `Successfully add new category. Affected Rows: ${result.affectedRows}`,
                        result : ress[0]
                    });    
                }); 
            });
        }else{
            return res.status(400).send({
                success: false,
                message: 'Vehicle\'s category already on the list'
            });
        }
    });
};

const updateCategory = (req, res)=>{
    const {id} = req.params;
    const {category} = req.body;
    const data = [category, id];
    vehicleCategories.getCategory(id, results=>{
        if(results.length>0){
            vehicleCategories.checkCategory(category, result=>{
                if(result.length<1){
                    vehicleCategories.updateCategory(data, ress=>{
                        vehicleCategories.checkCategory(category, resName=>{
                            return res.json({
                                success: true,
                                message: `Successfully update category with ID:${id}. Affected Rows: ${ress.affectedRows}`,
                                result: resName[0]
                            });
                        });
                    });
                }else{
                    return res.status(400).send({
                        success: false,
                        message: 'Vehicle\'s category already on the list'
                    });
                }
            });
        }else{
            return res.status(404).send({
                success: false,
                message: `Category with ID:${id} was not found`
            });
        }
    });
};

const deleteCategory = (req, res)=>{
    const {id} = req.params;
    if(id!==null && id!==undefined){
        vehicleCategories.getCategory(id, results=>{
            if(results.length>0){
                vehicleCategories.deleteCategory(id, result=>{
                    return res.json({
                        success: true,
                        message: `Category with ID: ${id} was deleted`,
                        result : `Rows Affected: ${result.affectedRows}`
                    });
                });
            }else{
                return res.status(400).send({
                    success: false,
                    message: `Can't find category with ID: ${id}`
                });
            }
        });
    }else{
        return res.status(400).send({
            sucess: false,
            message: 'Undefined ID'
        });
    }
};

module.exports = {getCategories, getCategory, addCategory, updateCategory, deleteCategory};