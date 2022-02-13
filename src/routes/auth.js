const users = require('express').Router();

const { login, ForgotPass } = require('../controllers/auth');

users.post('/login', login);
users.post('/forgot-password', ForgotPass);

module.exports = users;