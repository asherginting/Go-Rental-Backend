/* eslint-disable radix */
const categoryModel = require('../models/categories');
const getHelper = require('../helpers/get');

const getCategories = (req, res) => {
    getHelper(req, res, categoryModel.getCategories, categoryModel.countCategory, 'categories');
};

const addCategory = (req, res) => {
    const { name } = req.body;
    if (name) {
        return categoryModel.checkCategories(name, (checkResults) => {
            if (checkResults.length === 0) {
                return categoryModel.addCategory(name, () => {
                    categoryModel.newCategory((results) => res.json({
                        success: true,
                        message: 'Successfully added new category',
                        results: results[0],
                    }));
                });
            }
            return res.status(400).json({
                success: false,
                message: 'Failed to add new category. Data already exists',
            });
        });
    }
    return res.status(400).json({
        success: false,
        message: 'Data must be filled',
    });
};

const editCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (name) {
        return categoryModel.checkCategories(name, (checkResults) => {
            if (checkResults.length === 0) {
                return categoryModel.editCategory(name, id, (results) => {
                    if (results.changedRows > 0) {
                        return res.json({
                            success: true,
                            message: 'Edited successfully',
                            results: {
                                id_category: parseInt(id),
                                name,
                            },
                        });
                    }
                    return res.status(400).json({
                        success: false,
                        message: `Failed to edit category with id ${id}. Data hasnt changed or data is empty`,
                    });
                });
            }
            return res.status(400).json({
                success: false,
                message: 'Failed to edit category. Name already exists',
            });
        });
    }
    return res.status(400).json({
        success: false,
        message: 'name must be filled',
    });
};

const deleteCategory = (req, res) => {
    const { id } = req.params;
    categoryModel.getCategory(id, (categoryDeleted) => {
        categoryModel.deleteCategory(id, (results) => {
            if (results.affectedRows > 0) {
                return res.json({
                    success: true,
                    message: `Vehicle with id ${id} successfully deleted`,
                    results: categoryDeleted[0],
                });
            }
            return res.status(400).json({
                success: false,
                message: `Failed to delete category with id ${id}`,
            });
        });
    });
};

module.exports = {
    getCategories,
    addCategory,
    editCategory,
    deleteCategory,
};
