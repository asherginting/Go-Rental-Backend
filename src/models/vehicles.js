const db = require('../helpers/db');
const table = 'vehicles';

exports.getVehicles = (data, cb)=>{
    db.query(`SELECT * FROM ${table} WHERE name LIKE '%${data.name}%' AND location LIKE '%${data.location}%' AND cost>=${data.cost_min} AND cost<=${data.cost_max} LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res)=>{
        if (err) throw err;
        cb(res);
    });
};

exports.getVehicles = (data) => new Promise ((resolve, reject)=>{
    db.query(`SELECT * FROM ${table} WHERE name LIKE '%${data.name}%' AND location LIKE '%${data.location}%' AND cost>=${data.cost_min} AND cost<=${data.cost_max} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.getVehicle = (id, cb)=>{
    db.query(`SELECT * FROM ${table} WHERE id=?`,[id], (err,res)=>{
        if (err) throw err;
        cb(res);
    });
};

exports.getVehicle = (id) => new Promise ((resolve, reject)=>{
    db.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.addVehicle = (data, cb)=>{
    db.query(`INSERT INTO ${table} (name, image, year, cost, available, type, seat, category_id, location) VALUES (?,?,?,?,?,?,?,?,?)`, [data.name, data.image, data.year, data.cost, data.available, data.type, data.seat, data.category_id, data.location], (err, res) => {
        if(err) throw err;
        cb(res);
    });  
};

exports.addVehicle = (data)=> new Promise ((resolve, reject)=>{
    db.query(`INSERT INTO ${table} (name, image, year, cost, available, type, seat, category_id, location) VALUES('${data.name}', ${data.image}, '${data.year}', ${data.cost}, ${data.available}, '${data.type}', ${data.seat}, ${data.category_id}, '${data.location}')`, (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.checkVehicle = (isThere, cb)=>{
    db.query(`SELECT * FROM ${table} WHERE name=?`,[isThere], (err,res)=>{
        if (err) throw err;
        cb(res);
    });
};

exports.updateVehicle = (data, cb)=>{
    db.query(`UPDATE ${table} SET name=?, image=?, year=?, cost=?, available=?, type=?, seat=?, category_id=?, location=? WHERE id=?`, data, (err,res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.updateVehicle = (data, id)=>new Promise((resolve, reject)=>{
    db.query(`UPDATE ${table} SET ? WHERE id=?`, [data, id], (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.deleteVehicle = (id, cb)=>{
    db.query(`DELETE FROM ${table} WHERE id = ?`, [id],
        (err, res)=>{
            if (err) throw err;
            cb(res);
        });
};

exports.deleteVehicle = (id)=>new Promise((resolve, reject)=>{
    db.query(`DELETE FROM ${table} WHERE id=?`, [id], (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.getCategory = (data, cb)=>{
    db.query(`SELECT * FROM ${table} WHERE name LIKE '%${data.name}%' AND location LIKE '%${data.location}%' AND cost>=${data.cost_min} AND cost<=${data.cost_max} AND category_id=${data.category_id} LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res)=>{
        if (err) throw err;
        cb(res);
    });
};

exports.showVehicle = (data, cb)=>{
    db.query(`SELECT * FROM ${table} WHERE name = ? AND year =? AND location=?`, data, (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.countData = (data)=>new Promise((resolve, reject)=>{
    db.query(`SELECT COUNT(*) AS total FROM vehicles WHERE name LIKE '%${data.name}%' AND location LIKE '%${data.location}%' AND cost>=${data.cost_min} AND cost<=${data.cost_max}`, (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});

exports.getVehicleName = (data)=>new Promise((resolve, reject)=>{
    db.query(`SELECT * FROM vehicles WHERE name='${data.name}' && year='${data.year}' && cost=${data.cost} && location='${data.location}'`, (err, res)=>{
        if(err) reject(err);
        resolve(res);
    });
});