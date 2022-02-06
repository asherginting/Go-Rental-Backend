const histories = require('express').Router();

const {
    getHistories,
    getHistory,
    getHistoryId,
    addHistories,
    updateHistory,
    deleteHistory
} = require('../controllers/histories');

histories.get('/', getHistories);
histories.get('/:id', getHistory);
histories.get('/vehicles/:vehicle_id', getHistoryId);
histories.post('/', addHistories);
histories.patch('/:id', updateHistory);
histories.patch('/', updateHistory);
histories.delete('/:id', deleteHistory);
histories.delete('/', deleteHistory);

module.exports = histories;