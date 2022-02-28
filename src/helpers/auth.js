/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const response = require('./response');

const {
    APP_SECRET
} = process.env;

exports.verifyUser = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return response(req, res, 'Please login first', null, null, 403);
    }
    if (auth.startsWith('Bearer')) {
        const token = auth.split(' ')[1];
        if (token) {
            try {
                const payload = jwt.verify(token, APP_SECRET);
                req.user = payload;
                if (payload) {
                    return next();
                }
                return response(req, res, 'User not verified', null, null, 403);
            } catch (err) {
                return response(req, res, 'User not verified', null, null, 403);
            }
        }
        return response(req, res, 'Token must be provided', null, null, 403);
    }
    return response(req, res, 'Unexpected error', null, null, 500);
};