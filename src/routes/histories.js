const histories = require('express').Router();

const {
    addHistory,
    deleteHistory,
    upadateHistory,
    listHistories,
    getHistory
} = require('../controllers/histories');

histories.get('/', listHistories);
histories.post('/', addHistory);
histories.get('/:id', getHistory);
histories.patch('/:id', upadateHistory);
histories.delete('/:id', deleteHistory);

module.exports = histories;