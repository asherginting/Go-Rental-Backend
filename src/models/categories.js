const db = require('../helpers/db');
const table = 'categories';

exports.getCategories = (data) => {
    const {
        limit,
        page
    } = data;

    const offset = (page - 1) * limit;

    return new Promise((resolve, reject) => {
        db.query(`SELECT id, name FROM ${table} LIMIT ? OFFSET ?`, [limit, offset], (err, results) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

exports.getCategory = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, results) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

exports.addCategory = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO ${table} SET ?`, data, (err, results) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

exports.deleteCategory = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, results) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

exports.updateCategory = (id, data) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err, results) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

exports.getCategoryByName = (name) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT name FROM ${table} WHERE name = ?`, [name], (err, results) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

exports.countCategories = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) AS 'rows' FROM ${table}`, (err, results) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};