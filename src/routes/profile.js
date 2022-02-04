const profile = require('express').Router();

const profileUser = require('../controllers/profile');

profile.get('/:id', profileUser);

module.exports = profile;
