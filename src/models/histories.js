const db = require('../helpers/db');
const table = 'histories';
const table2 = 'vehicles';

exports.getHistories = (data, cb)=>{
    db.query(`SELECT h.id, v.name AS vehicle, u.name AS user_name, prepayment, rent_date, return_date FROM ${table} h JOIN users u ON h.user_id=u.id JOIN vehicles v ON h.vehicle_id=v.id WHERE v.name LIKE '%${data.vehicle_name}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.getHistoryId = (data, cb)=>{
    db.query(`SELECT h.id, v.name AS vehicle, u.name AS user_name, prepayment, rent_date, return_date FROM ${table} h JOIN users u ON h.user_id=u.id JOIN vehicles v ON h.vehicle_id=v.id WHERE v.id=${data.vehicle_id} LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.getHistory = (id, cb)=>{
    db.query(`SELECT h.id, v.name AS vehicle, u.name AS user_name, prepayment, rent_date, return_date FROM ${table} h JOIN users u ON h.user_id=u.id JOIN vehicles v ON h.vehicle_id=v.id WHERE h.id = ?`, [id], (err,res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.getHistVId = (vehicle_id, cb)=>{
    db.query(`SELECT h.id, v.name AS vehicle, u.name AS user_name, prepayment, rent_date, return_date FROM ${table} h JOIN users u ON h.user_id=u.id JOIN vehicles v ON h.vehicle_id=v.id WHERE v.id = ?`, [vehicle_id], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.addHistories = (data, cb)=>{
    db.query(`INSERT INTO ${table} (vehicle_id, user_id, prepayment, rent_date, return_date) VALUES(?,?,?,?,?)`, data, (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.updateHistory = (data, cb)=>{
    db.query(`UPDATE ${table} SET vehicle_id=?, user_id=?, prepayment=?, rent_date=?, return_date=? WHERE id=?`, data, (err,res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.editHistory = (vehicle_id, cb)=>{
    db.query(`UPDATE ${table2} v SET v.available=v.available-1 WHERE id=${vehicle_id}`, (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.getDiscount = (cb)=>{
    db.query(`SELECT v.cost, (100-d.discount_amount)/100*cost as discount_cost, 0.5*(100-d.discount_amount)/100*cost AS min_payment, d.discount_date AS discount_date FROM ${table2} v JOIN discount d WHERE v.id=d.vehicle_id`, (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.deleteHistory = (id, cb)=>{
    db.query(`DELETE FROM ${table} WHERE id=?`, [id], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};