const db = require('../helpers/db');
const table = 'histories';

exports.getHistories = (keys) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT ?? FROM ${table}`, [keys], (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

exports.getHistory = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

exports.insertHistory = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO ${table} SET ?`, data, (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

exports.updateHistory = (id, data) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

exports.deleteHistory = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};