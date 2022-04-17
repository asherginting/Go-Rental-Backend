const categories = require('express').Router();

const { getCategories, getCategory, addCategory, editCategory, deleteCategory } = require('../controllers/categories');
const { verifyUser } = require('../helpers/auth');

categories.get('/', getCategories);
categories.get('/:id', getCategory);
categories.post('/', verifyUser, addCategory);
categories.patch('/:id', verifyUser, editCategory);
categories.delete('/:id', verifyUser, deleteCategory);

module.exports = categories;
