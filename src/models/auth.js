const db = require('../helpers/db');
const users = require('../helpers/tableHandler').usersTable;
const request = require('../helpers/tableHandler').forgotRequestTable;

exports.login = (data)=>{
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM ${users} WHERE username=?`, [data.username], (err, res)=>{
            if(err) reject(err);
            resolve(res);
        });
    });
};

exports.getUsername = (username) => new Promise((resolve, reject)=>{
    db.query(`SELECT id, username, email, password, role FROM ${users} WHERE username='${username}' OR email='${username}'`, (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.requestPassword = (data)=>new Promise((resolve, reject)=>{
    db.query(`INSERT INTO ${request} (user_id, code, expired_date) VALUES(${data.user_id}, ${data.code}, ${data.expired_date})`, (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.updateReqPassword = (id)=>new Promise((resolve, reject)=>{
    db.query(`UPDATE ${request} SET status = 0 WHERE id=?`, [id], (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.updatePassword = (password, id)=>new Promise((resolve, reject)=>{
    db.query(`UPDATE ${users} SET password=? WHERE id=?`, [password, id], (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.codeCompare = (code)=>new Promise((resolve, reject)=>{
    db.query(`SELECT * FROM ${request} WHERE code=${code}`, (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});