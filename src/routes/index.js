// const vehicles = require('./vehicles')
const route = require('express').Router();

route.use('/vehicles', require('./vehicles'));
route.use('/users', require('./users'));
route.use('/auth', require('./auth'));
route.use('/histories', require('./histories'));
route.use('/profile', require('./profile'));
route.use('/popular', require('./popular'));
route.use('/categories', require('./categories'));

route.get('/', (req, res)=> {
    return res.json({
        success: true,
        message: 'Backend is running well!'
    });
});

module.exports = route;
