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
},

exports.checkExistVehicle = (data, cb) => {
    // make custom query depends keys of object
    let dataInArr = Object.keys(data);
    dataInArr = dataInArr.map((el) => {
        return `${el} = ?`;
    });
    const customQuery = dataInArr.join(' && ');

    // get values of data
    const dataValues = Object.values(data);
    const columns = Object.keys(data);

    db.query(`
    SELECT ?? FROM ${table} WHERE ${customQuery}
    `, [columns, ...dataValues], (err, results) => {
        if (err) throw err;
        cb(results);
    });
},

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