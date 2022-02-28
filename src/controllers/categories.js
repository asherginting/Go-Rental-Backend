/* eslint-disable radix */
const categoryModel = require('../models/categories');
const getHelper = require('../helpers/get');
const response = require('../helpers/response');

const getCategories = (req, res) => {
  getHelper(req, res, categoryModel.getCategories, categoryModel.countCategory, 'categories');
};

const getCategoriesData = (req, res) => {
  getHelper(req, res, categoryModel.getCategoriesData, categoryModel.countCategoryData, 'categories');
};

const getCategory = (req, res) => {
  const { id } = req.params;
  categoryModel.getCategory(id, (results) => {
    if (results.length > 0) {
      return response(req, res, `Data ategory with id ${id}`, results[0]);
    }
    return response(req, res, `Category not found with id ${id}`, null, null, 404);
  });
};

const addCategory = (req, res) => {
  if (req.user.role === 'Admin') {
    const { type } = req.body;
    if (type) {
      return categoryModel.checkCategories(type, (checkResults) => {
        if (checkResults.length === 0) {
          return categoryModel.addCategory(type, () => {
            categoryModel.newCategory((results) => response(req, res, 'Successfully added new category', results[0]));
          });
        }
        return response(req, res, 'Failed to add new category. Data already exists', null, null, 400);
      });
    }
    return response(req, res, 'Data must be filled', null, null, 400);
  }
  return response(req, res, 'Only admin can add category', null, null, 403);
};

const editCategory = (req, res) => {
  if (req.user.role === 'Admin') {
    const { id } = req.params;
    const { type } = req.body;
    if (type) {
      return categoryModel.getCategory(id, (resId) => {
        if (resId.length > 0) {
          return categoryModel.checkCategories(type, (checkResults) => {
            if (checkResults.length === 0) {
              return categoryModel.editCategory(type, id, (results) => {
                if (results.changedRows > 0) {
                  const result = { id_category: parseInt(id), type };
                  return response(req, res, 'Edited successfully', result);
                }
                return response(req, res, `Failed to edit category with id ${id}. Data hasnt changed`, null, null, 400);
              });
            }
            return response(req, res, `Failed to edit category. Type ${type} already exists`, null, null, 400);
          });
        }
        return response(req, res, `Category with id ${id} not found`, null, null, 400);
      });
    }
    return response(req, res, 'Type must be filled', null, null, 400);
  }
  return response(req, res, 'Only admin can edit category', null, null, 403);
};

const deleteCategory = (req, res) => {
  if (req.user.role !== 'Admin') {
    return response(req, res, 'Only admin can delete category', null, null, 403);
  }
  const { id } = req.params;
  return categoryModel.getCategory(id, (categoryDeleted) => {
    categoryModel.deleteCategory(id, (results) => {
      if (results.affectedRows > 0) {
        return response(req, res, `Vehicle with id ${id} successfully deleted`, categoryDeleted[0]);
      }
      return response(req, res, `Failed to delete, category with id ${id} not found`, null, null, 500);
    });
  });
};

module.exports = {
  getCategories,
  getCategoriesData,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
};
