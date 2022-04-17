const db = require('../helpers/db');
const users = require('../helpers/tableHandler').usersTable;

const getProfile = (id, cb) => {
    db.query(`SELECT id_user, name, username, gender, email, phone_number, address, birthdate FROM ${users} WHERE id_user=?`, [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

module.exports = getProfile;
