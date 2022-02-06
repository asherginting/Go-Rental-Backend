const popular = require('express').Router();

const {
    popularList, 
    popularId, 
    popularByMonth
} = require('../controller/popular');

popular.get('/', popularList);
popular.get('/month/', popularByMonth);
popular.get('/:category_id', popularId);
popular.get('/month/:category_id', popularId);

module.exports = popular;
