const db = require('../helpers/db');
const vehicles = require('../helpers/tableHandler').vehiclesTable;

const countPopular = (data, cb) => {
    db.query(`SELECT COUNT(*) as total FROM vehicles WHERE type LIKE '${data.search}%'`, (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

const popularVehicle = (data, cb) => {
    db.query(`SELECT id_vehicle, id_category, type, brand , image AS image, capacity, location, price, qty, payment, rent_count, status, createdAt, updatedAt FROM ${vehicles} WHERE type LIKE '${data.search}%' OR location LIKE '${data.search}%' OR brand LIKE '${data.search}%' ORDER by rent_count DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

module.exports = { 
    countPopular, 
    popularVehicle 
};
