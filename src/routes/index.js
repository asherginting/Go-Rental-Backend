const route = require('express').Router()

route.use('/vehicles', require('./vehicles'))

module.exports = route
