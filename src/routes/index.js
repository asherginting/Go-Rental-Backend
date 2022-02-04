// const vehicles = require('./vehicles')
const route = require('express').Router();

route.use('/vehicles', require('./vehicles'));
route.use('/users', require('./users'));
route.use('/histories', require('./histories'));
route.use('/profile', require('./profile'));
route.use('/popular', require('./popular'));
route.use('/categories', require('./categories'));

module.exports = route;
