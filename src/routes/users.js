const users = require('express').Router();

const {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/', addUser);
users.patch('/', updateUser);
users.patch('/:id', updateUser);
users.delete('/:id', deleteUser);
users.delete('/', deleteUser);

module.exports = users;