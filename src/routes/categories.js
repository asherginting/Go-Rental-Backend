const express = require('express');
const categories = new express.Router();

const controller = require('../controllers/categories');

categories.get('/', controller.listCategories);
categories.get('/:id', controller.getCategory);
categories.post('/', controller.addCategory);
categories.put('/:id', controller.updateCategory);
categories.delete('/:id', controller.deleteCategory);

module.exports = categories;
