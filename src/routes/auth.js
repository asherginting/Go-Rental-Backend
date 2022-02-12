const users = require('express').Router();

const { login, verify } = require('../controllers/auth');

users.post('/login', login);
users.post('/verify', verify);

module.exports = users;