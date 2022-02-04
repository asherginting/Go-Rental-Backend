const db = require('../helpers/db');
const table = 'users';

const getProfile = (id, cb) => {
    db.query(`SELECT id, name, email, gender, address, birthdate, phone, FROM ${table} WHERE id_user=?`, [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

module.exports = getProfile;
