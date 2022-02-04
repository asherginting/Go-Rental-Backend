const categories = require('express').Router();

const {
    getCategories, addCategory, editCategory, deleteCategory,
} = require('../controllers/categories');

categories.get('/', getCategories);
categories.post('/', addCategory);
categories.patch('/:id', editCategory);
categories.delete('/:id', deleteCategory);

module.exports = categories;
