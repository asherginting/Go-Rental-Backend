const response = require('../helpers/response');
const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = process.env;

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const result = await userModel.getUserByUsername(username);
    if (result.length === 1) {
        const { password: hash } = result[0];
        const fin = await bcrypt.compare(password, hash);
        if (fin) {
            const data = { id: result[0].id };
            if (username === 'admin') {
                data.role = 'admin';
            }
            const token = jwt.sign(data, APP_SECRET);
            return response(res, 'Login success!', { token });
        } else {
            return response(res, 'Wrong username or password!', null, 403);
        }
    } else {
        return response(res, 'Wrong username or password!', null, 403);
    }
};

exports.verify = (req, res) => {
    // return response(res, 'Headers', { headers: req.headers });
    const auth = req.headers.authorization; // Bearer djihasuiodhasoid
    if (auth.startsWith('Bearer')) {
        const token = auth.split(' ')[1];
        if (token) {
            try {
                if (jwt.verify(token, APP_SECRET)) {
                    return response(res, 'User verified!');
                } else {
                    return response(res, 'User not verified!', null, 403);
                }
            } catch (err) {
                return response(res, 'User not verified!', null, 403);
            }
        }
    }
};