const profile = require('express').Router();

const profileUser = require('../controllers/profile');
const { verifyUser } = require('../helpers/auth');

profile.get('/', verifyUser, profileUser.getProfile);
profile.patch('/', verifyUser, profileUser.updateProfile);

module.exports = profile;
