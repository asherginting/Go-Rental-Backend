const route = require('express').Router();

route.use('/vehicles', require('./vehicles'));
route.use('/popular', require('./popular'));
route.use('/users', require('./users'));
route.use('/auth', require('./auth'));
route.use('/profile', require('./profile'));
route.use('/histories', require('./histories'));
route.use('/categories', require('./categories'));

module.exports = route;
