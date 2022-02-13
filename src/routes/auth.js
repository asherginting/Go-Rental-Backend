const users = require('express').Router();

const { login, register, forgotPass, logout, verify } = require('../controllers/auth');

users.post('/login', login);
users.post('/register', register);
users.post('/forgotPass', forgotPass);
users.post('/logout', logout);
users.post('/verify', verify);

module.exports = users;