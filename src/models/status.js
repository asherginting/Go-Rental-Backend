const db = require('../helpers/db');
const status = require('../helpers/tableHandler').statusTable;

const getStatus = (id, cb) => {
    db.query(`SELECT * FROM ${status} WHERE id_status=?`, [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

module.exports = getStatus;
