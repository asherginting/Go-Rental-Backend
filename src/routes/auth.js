const user = require('express').Router();

const {
    login, 
    verify, 
    forgotRequest,
    sendCodeVerify, 
    confirmRegistration,
} = require('../controllers/auth');
const { addUser, addUserComplete } = require('../controllers/users');

user.post('/login', login);
// user.post('/verify', verify);
user.post('/forgotPassword', forgotRequest);
user.post('/register', addUser);
user.post('/complete-register', addUserComplete);
user.post('/send-code-verify', sendCodeVerify);
user.post('/verification', confirmRegistration);

module.exports = user;
