const usersModel = require('../models/users');
const {
    dataValidator,
    requestReceiver,
    validateId
} = require('../helpers/requestHandler');
const {
    returningError,
    returningSuccess
} = require('../helpers/responseHandler');
const historiesModel = require('../models/histories');


const listHistories = async (req, res) => {
    try {
        const keys = [
            'id', 'user_id', 'vehicle_id', 'payment_code', 'payment', 'returned',
            'prepayment'
        ];

        const results = await historiesModel.getHistories(keys);

        return returningSuccess(res, 200, 'Success getting histories', results);
    } catch (error) {
        console.error(error);
        return returningError(res, 500, 'Failed to get list of history');
    }
};

const addHistory = async (req, res) => {
    try {
        const keys = [
            'user_id',
            'vehicle_id',
            'payment_code',
            'payment',
            'returned',
            'prepayment'
        ];
        const data = requestReceiver(req.body, keys);

        // validate inputed data
        const isValidate = dataValidator(data);

        if (!isValidate) {
            return res.status(400).json({
                success: true,
                message: 'Data not validate'
            });
        }

        // check if user exist
        const result = await usersModel.getUser(data.user_id);

        if (result.length < 1) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // check if history has beed added
        const historyResult = await historiesModel.addHistory(data);

        if (historyResult.affectedRows < 1) {
            return res.status(400).json({
                success: false,
                message: 'Cant make transaction'
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Transaction is created'
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteHistory = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        // validate inputed id
        if (!validateId(id)) {
            return returningError(res, 400, 'Id must be a number');
        }

        // check if history exist
        const history = await historiesModel.getHistory(id);

        // if history exist
        if (history.length > 0) {
            // delete history
            const result = await historiesModel.deleteHistory(id);

            // if history can't to delete
            if (result.affectedRows < 1) {
                return returningError(res, 400, 'cant delete history');
            }

            // if history deleted
            return returningSuccess(res, 200, 'History has been deleted', history);
        }

        // if history not exist
        return returningError(res, 404, 'History not found');
    } catch (error) {
        // if error exist
        console.log(error);
        return returningError(res, 500, 'Failed to delete history');
    }
};

const upadateHistory = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const keys = [
            'payment', 'returned', 'prepayment'
        ];
        const data = requestReceiver(req.body, keys);

        // validate inputed id
        if (!validateId(id)) {
            return returningError(res, 400, 'Id must be a number');
        }

        // validate inputed data
        const isValidate = dataValidator(data);

        if (!isValidate) {
            return returningError(res, 400, 'Data not validate');
        }

        // check if history exist
        const history = await historiesModel.getHistory(id);

        // if history not exist
        if (history.length < 1) {
            return returningError(res, 404, 'History not found');
        }

        // update history
        const result = await historiesModel.updateHistory(id, data);

        // if history can't to update
        if (result.affectedRows < 1) {
            return returningError(res, 500, 'Cant update history');
        }

        // get updated history
        const updatedHistory = await historiesModel.getHistory(id);

        return returningSuccess(res, 200, 'History has been updated', updatedHistory[0]);
    } catch (error) {
        console.log(error);
        console.error(error);
        return returningError(res, 500, 'Failed to update history');
    }
};

const getHistory = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        // validate inputed id
        if (!validateId(id)) {
            return returningError(res, 400, 'Id must be a number');
        }

        const result = await historiesModel.getHistory(id);

        // if history not exist
        if (result.length < 1) {
            return returningError(res, 404, 'History not found');
        }

        return returningSuccess(res, 200, 'Success getting history', result[0]);
    } catch (error) {
        console.error(error);
        return returningError(res, 500, 'Failed to get history');
    }
};

module.exports = {
    listHistories,
    addHistory,
    deleteHistory,
    upadateHistory,
    getHistory
};