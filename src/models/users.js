const db = require('../helpers/db');
const table = 'users';

exports.getUsers = (data, cb)=>{
    db.query(`SELECT * FROM ${table} WHERE name LIKE '%${data.name}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.getGender = (data, cb)=>{
    db.query(`SELECT * FROM ${table} WHERE name LIKE '%${data.name}%' AND gender=${data.gender} LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.getUser = (id, cb)=>{
    db.query(`SELECT * FROM ${table} WHERE id =?`, [id], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.checkContact = (contact, cb)=>{
    db.query(`SELECT * FROM ${table} WHERE email=? OR phone_number=?`, contact, (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.checkEmail = (email, cb)=>{
    db.query(`SELECT * FROM ${table} WHERE email=?`, [email], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.checkPhone = (phone, cb)=>{
    db.query(`SELECT * FROM ${table} WHERE phone_number=?`, [phone], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.addUser = (data, cb)=>{
    db.query(`INSERT INTO ${table} (name, email, password, phone_number, gender, birthdate, address) VALUES(?,?,?,?,?,?,?)`, data, (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.updateUser = (data, cb)=>{
    db.query(`UPDATE ${table} SET name=?, email=?, password=?, phone_number=?, gender=?, birthdate=?, address=? WHERE id=?`, data, (err,res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.deleteUser = (id, cb)=>{
    db.query(`DELETE FROM ${table} WHERE id=?`, [id], (err,res)=>{
        if(err) throw err;
        cb(res);
    });
};