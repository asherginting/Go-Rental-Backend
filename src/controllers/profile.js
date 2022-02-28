const userModel = require('../models/users');
const response = require('../helpers/response');
const upload = require('../helpers/upload').single('image');

const getProfile = async (req, res) => {
    const { id } = req.user;
    const profile = await userModel.getUserById(id);
    if (profile.length > 0) {
        return response(req, res, 'Data profile', profile[0]);
    }
    return response(req, res, 'Unexpected error', null, null, 500);
};

const updateProfile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return response(req, res, err.message, null, null, 400);
        }
        // eslint-disable-next-line no-unused-vars
        const { id } = req.user;
        const data = {};
        const userData = ['name', 'username', 'gender', 'email', 'phone_number', 'address', 'birthdate'];
        userData.forEach((item) => {
            if (req.body[item]) {
                data[item] = req.body[item];
            }
        });
        if (req.file) {
            data.image = req.file.path;
        }
        if (data.username) {
            const user = await userModel.getUserByUserName(data.username);
            if (user.length > 0) {
                return response(req, res, 'Username is already exist', null, null, 400);
            }
        }
        return response(req, res, 'ok', data);
    });
};

module.exports = {
    getProfile,
    updateProfile,
};
