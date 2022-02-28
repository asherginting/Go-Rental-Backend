const history = require('express').Router();

const {
  getHistories, getHistory, addHistory, editAllHistory, editHistory, deleteHistory,
} = require('../controllers/histories');
const { verifyUser } = require('../helpers/auth');

history.get('/', verifyUser, getHistories);
history.get('/:id', verifyUser, getHistory);
history.post('/', verifyUser, addHistory);
history.put('/:id', verifyUser, editAllHistory);
history.patch('/:id', verifyUser, editHistory);
history.delete('/:id', verifyUser, deleteHistory);

module.exports = history;
