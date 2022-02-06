const categories = require('express').Router();

const {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
}= require('../controllers/categories');

categories.get('/', getCategories);
categories.get('/:id', getCategory);
categories.post('/', addCategory);
categories.patch('/:id', updateCategory);
categories.patch('/', updateCategory);
categories.delete('/:id', deleteCategory);
categories.delete('/', deleteCategory);

module.exports = categories;
