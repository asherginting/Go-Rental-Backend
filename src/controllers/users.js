const usersModel = require('../models/users');
const {
    baseURL
} = require('../helpers/url');
const {
    dataValidator,
    validateId,
    requestReceiver
} = require('../helpers/requestHandler');
const {
    returningError,
    returningSuccess,
    pageCreator
} = require('../helpers/responseHandler');

const userKeys = [
    'name',
    'email',
    'gender',
    'address',
    'birthdate',
    'phone'
];

const getUser = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        if (!validateId(id)) {
            return returningError(res, 400, 'Id must be a number');
        }

        const user = await usersModel.getUser(id);

        if (user.length < 1) {
            return returningError(res, 404, 'User not found');
        }

        console.log(user);

        return returningSuccess(res, 200, 'Success getting a user', user[0]);
    } catch (error) {
        console.error(error);
        return returningError(res, 500, 'Failed to get user');
    }
};

const addUser = async (req, res) => {
    try {
        const data = requestReceiver(req.body, userKeys);

        if (!dataValidator(data)) {
            return returningError(res, 400, 'Your data isnt validate');
        }

        const isEmailExist = await usersModel.findEmail(data.email);
        const isPhoneExist = await usersModel.findPhone(data.phone);

        if (isEmailExist[0].rows > 0) {
            return returningError(res, 400, 'Email already registered');
        }

        if (isPhoneExist[0].rows > 0) {
            return returningError(res, 400, 'Phone already registered');
        }

        const results = await usersModel.insertUser(data);
        const user = await usersModel.getUser(results.insertId);

        if (results.affectedRows > 0) {
            return res.status(201).json({
                success: true,
                message: 'Success insert new user',
                results: user[0]
            });
        }
    } catch (error) {
        console.error(error);
        const err = 'Failed to insert data';
        return returningError(res, 500, err);
    }
};

const deleteUser = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        if (!validateId(id)) {
            return returningError(res, 400, 'Id must be a number');
        }

        const user = await usersModel.getUser(id);

        if (user.length > 0) {
            const results = await usersModel.deleteUser(id);

            if (results.affectedRows > 0) {
                return res.status(200).json({
                    success: true,
                    message: 'Success delete a user',
                    results: user[0]
                });
            } else {
                throw new Error('Failed to delete data');
            }
        }

        return res.status(404).json({
            success: false,
            message: `User with id ${id} not found`
        });
    } catch (error) {
        const err = error.sqlMessage ? error.sqlMessage : 'Failed to delete user';
        return returningError(res, 500, err);
    }
};

const updateUser = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const data = requestReceiver(req.body, userKeys);

        if (!validateId(id)) {
            return returningError(res, 400, 'Id must be a number');
        }

        if (!dataValidator(data)) {
            return returningError(res, 400, 'Data is not validate!');
        }

        const isEmailExist = await usersModel.findEmail(data.email);
        const isPhoneExist = await usersModel.findPhone(data.phone);

        if (isEmailExist[0].rows > 0) {
            return returningError(res, 400, 'Email already registered');
        }

        if (isPhoneExist[0].rows > 0) {
            return returningError(res, 400, 'Phone already registered');
        }

        const results = await usersModel.updateUser(id, data);

        if (results.affectedRows > 0) {
            const user = await usersModel.getUser(id);

            return res.status(200).json({
                success: true,
                message: 'Success update a user',
                results: user[0]
            });
        }

        return returningError(res, 500, 'Failed to delete an user');
    } catch (error) {
        const err = error.sqlMessage ? error.sqlMessage : 'Failed to delete user';
        return returningError(res, 500, err);
    }
};

const listUsers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const name = req.query.name || '';
        const email = req.query.email || '';
        const offset = (page - 1) * limit;

        const results = await usersModel.getUsers(limit, offset, {
            name,
            email
        });

        const countResults = await usersModel.countUsers();
        const totalUsers = countResults[0].rows;
        const totalPages = Math.ceil(totalUsers / limit);

        const lastPage = name || email ? Math.ceil(results.length / limit) : Math.ceil(totalUsers / limit);

        const pages = pageCreator(`${baseURL}/users?`, {
            page,
            limit,
            name,
            email
        });

        const pageInfo = {
            totalUsers: name || email ? results.length : totalUsers,
            currentPage: page,
            nextPage: page < totalPages ? pages.next : null,
            prevPage: page > 1 ? pages.prev : null,
            lastPage: name || email ? lastPage : totalPages
        };

        return returningSuccess(res, 200, 'Success getting all users', results, pageInfo);
    } catch (error) {
        console.error(error);
        return returningError(res, 500, 'Failed to get list of users');
    }
};

module.exports = {
    getUser,
    addUser,
    deleteUser,
    updateUser,
    listUsers
};
