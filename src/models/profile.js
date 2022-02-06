const db = require('../helpers/db');
const table = 'users';

exports.getProfile = (id, cb)=>{
    db.query(`SELECT name, email, phone_number, gender, birthdate, address FROM ${table} WHERE id=?`, [id], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};