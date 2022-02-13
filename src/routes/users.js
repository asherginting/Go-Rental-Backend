const users = require('express').Router();
const {verifyUser} = require('../helpers/auth');
const upload = require('../helpers/upload');

const {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
} = require('../controllers/users');

users.get('/', verifyUser, getUsers);
users.get('/:id', verifyUser, getUser);
users.post('/', addUser);
users.patch('/', verifyUser, updateUser);
users.patch('/:id', verifyUser, upload.single('image'), updateUser);
users.delete('/:id', verifyUser, deleteUser);
users.delete('/', verifyUser, deleteUser);

module.exports = users;