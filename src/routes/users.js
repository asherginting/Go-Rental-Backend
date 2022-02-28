const users = require('express').Router();

const {
  getUsers, getUser, addUser, editAllDataUser, editUser, deleteUser,
} = require('../controllers/users');
const { verifyUser } = require('../helpers/auth');

users.get('/', getUsers);
users.post('/registry', addUser);
users.get('/:id', getUser);
users.put('/:id', verifyUser, editAllDataUser);
users.patch('/:id', verifyUser, editUser);
users.delete('/:id', verifyUser, deleteUser);

module.exports = users;
