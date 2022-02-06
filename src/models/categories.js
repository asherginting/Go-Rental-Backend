const db = require('../helpers/db');
const table = 'categories';

exports.getCategories = (cb)=>{
    db.query(`SELECT * FROM ${table}`, (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.getCategory = (id, cb)=>{
    db.query(`SELECT * FROM ${table} WHERE id =?`, [id], (err,res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.checkCategory = (category, cb)=>{
    db.query(`SELECT * FROM ${table} WHERE category=?`, [category], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.addCategory = (category, cb)=>{
    db.query(`INSERT INTO ${table} (category) VALUES (?)`, [category], (err,res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.updateCategory = (data, cb)=>{
    db.query(`UPDATE ${table} SET category=? WHERE id=?`, data, (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.deleteCategory = (id, cb)=>{
    db.query(`DELETE FROM ${table} WHERE id=${id}`, (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};