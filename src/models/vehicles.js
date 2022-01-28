const db = require('../helpers/db');
const table = 'vehicle';

exports.getVehicles = (cb) => {
    db.query('SELECT * FROM vehicle', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getVehicle = (id, cb) => {
    db.query('SELECT * FROM vehicle WHERE id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.insertVehicle = (data, cb) => {
    db.query(`INSERT INTO ${table} SET ?`, data, (err, results) => {
        if (err) throw err;
        cb(results);
    });
},

exports.updateVehicle = (id, data, cb) => {
    db.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err, results) => {
        if (err) throw err;
        cb(results);
    });
},

exports.deleteVehicle = (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, results) => {
        if (err) throw err;
        cb(results);
    });
};