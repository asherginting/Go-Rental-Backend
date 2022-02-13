const db = require('../helpers/db');
const table = 'users';

exports.getUsers = ()=> new Promise((resolve, reject)=>{
    db.query(`SELECT * FROM ${table}`, (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.getUser = (id, cb)=>{
    db.query(`SELECT * FROM ${table} WHERE id =?`, [id], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.getUsername = (username)=>new Promise((resolve, reject)=>{
    db.query(`SELECT * FROM ${table} WHERE username='${username}'`, (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.getEmail = (email)=>new Promise((resolve, reject)=>{
    db.query(`SELECT * FROM ${table} WHERE email='${email}'`, (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.getPhone = (phone_number)=>new Promise((resolve, reject)=>{
    db.query(`SELECT * FROM ${table} WHERE phone_number=${phone_number}`, (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.addUser = async (data) => new Promise ((resolve, reject) => {
    db.query(`INSERT INTO ${table} (name, email, username, password, phone_number, gender, birthdate, address) VALUES ('${data.name}', '${data.email}', '${data.username}', '${data.password}', '${data.phone_number}', '${data.gender}', '${data.birthdate}', '${data.address}')`, (err, res) => {
        if(err) reject(err);
        resolve(res);
    });
});

exports.updateUser = (data, id)=>new Promise((resolve, reject)=>{
    db.query(`UPDATE ${table} SET ? WHERE id=?`, [data, id], (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.deleteUser = (id)=>new Promise((resolve, reject)=>{
    db.query(`DELETE FROM ${table} WHERE id=?`, [id], (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});