// const vehicles = require('./vehicles')
const route = require('express').Router();

route.use('/vehicles', require('./vehicles'));
route.use('/users', require('./users'));
route.use('/histories', require('./histories'));

module.exports = route;
