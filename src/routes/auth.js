const user = require('express').Router();

const { login, forgotPass, verificationRegister } = require('../controllers/auth');
const { addUser } = require('../controllers/users');

user.post('/login', login);
user.post('/forgot', forgotPass);
user.post('/register', addUser);
user.post('/verification', verificationRegister);

module.exports = user;
