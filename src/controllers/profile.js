const userModel = require('../models/users');
const response = require('../helpers/response');
const upload = require('../helpers/upload').single('image');
const check = require('../helpers/check');
const deleteImg = require('../helpers/deleteImg');

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
        const user = await userModel.getUserById(id);
        const data = {};
        const userData = ['name', 'gender', 'address', 'birthdate'];
        userData.forEach((item) => {
            if (req.body[item]) {
                data[item] = req.body[item];
            }
        });
        const { username, email, phone_number } = req.body;
        if (req.file) {
            data.image = req.file.path.replace(/\\/g, '/');
        }
        console.log(req.body, req.file);
        if (username) {
            const checkUser = await userModel.getUserByUserName(username);
            if (checkUser.length > 0) {
                return response(req, res, 'Username has been used', null, null, 400);
            }
            data.username = username;
        }
        if (email) {
            if (!check.checkEmail(email)) {
                return response(req, res, 'Wrong email input', null, null, 400);
            }
            // const resEmail = email;
            const result = await userModel.checkUserAsync({ email });
            if (result.length > 0) {
                return response(req, res, 'Email has been used', null, null, 400);
            }
            data.email = email;
        }
        if (phone_number) {
            if (!check.checkPhone(phone_number)) {
                return response(req, res, 'Wrong phone number input', null, null, 400);
            }
            // const phone = phone_number;
            const result = await userModel.checkUserAsync({ phone_number });
            if (result.length > 0) {
                return response(req, res, 'phone number has been used', null, null, 400);
            }
            data.phone_number = phone_number;
        }
        return userModel.editUser(data, id, async (edited) => {
            if (edited.affectedRows > 0) {
                if (req.file) {
                    deleteImg.rm(user);
                }
                const results = await userModel.getUserById(id);
                return response(req, res, 'Data user', results[0]);
            }
            return response(req, res, 'Unexpected error', null, null, 500);
        });
    // return response(req, res, 'ok', data);
    });
};

module.exports = {
    getProfile,
    updateProfile,
};
