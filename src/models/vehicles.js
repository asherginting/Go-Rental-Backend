const db = require('../helpers/db');
const table = 'vehicles';

exports.getVehicles = (limit, offset, search) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id, name, price, type, qty, location FROM ${table} WHERE name LIKE '${search}%' LIMIT ? OFFSET ?`, [limit, offset], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

exports.getVehicle = (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id=?`, [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
},

exports.checkExistVehicle = (data, cb) => {
    let dataInArr = Object.keys(data);
    dataInArr = dataInArr.map((el) => {
        return `${el} = ?`;
    });
    const customQuery = dataInArr.join(' && ');

    //value data
    const dataValues = Object.values(data);
    const columns = Object.keys(data);

    db.query(`
    SELECT ?? FROM ${table} WHERE ${customQuery}
    `, [columns, ...dataValues], (err, res) => {
        if (err) throw err;
        cb(res);
    });
},

exports.insertVehicle = (data, cb) => {
    db.query(`INSERT INTO ${table} SET ?`, data, (err, res) => {
        if (err) throw err;
        cb(res);
    });
},

exports.updateVehicle = (id, data, cb) => {
    db.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
},

exports.deleteVehicle = (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.listLimitVehicle = (page, limit) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id, name, price, type, qty, location FROM ${table} LIMIT = ? OFFSET = ?`, [page, limit], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

exports.countData = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) AS 'row' FROM ${table};`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

exports.getPopularVehicles = () => {
    return new Promise((resolve, reject) => {
        db.query(`
          SELECT id, name, price, type, qty, location FROM ${table} ORDER BY 'rentCount'  DESC`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

exports.getVehicleCategory = (data, cb) => {
    db.query(`SELECT v.* FROM vehicles v LEFT JOIN categories c ON v.id_category = c.id_category WHERE c.name LIKE '${data}%';`, (err, res) => {
        if (err) throw err;
        cb(res);
    });
};