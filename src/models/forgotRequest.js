const db = require('../helpers/db');
const request = require('../helpers/tableHandler').forgotRequestTable;

const createRequest = (id_user, code) => new Promise((resolve, reject) => {
    db.query(`INSERT INTO ${request} (id_user, code) VALUES (${id_user}, ${code})`, (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

const getRequest = (code) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${request} WHERE code = ${code}`, (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

const getRequestById = (id_request) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${request} WHERE id_request = ${id_request}`, (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

const updateExpired = (id) => new Promise((resolve, reject) => {
    db.query(`UPDATE ${request} SET expired='false' WHERE id_request=${id}`, (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

module.exports = {
    createRequest,
    getRequest,
    getRequestById,
    updateExpired,
};
