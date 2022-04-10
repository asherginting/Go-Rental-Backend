const db = require('../helpers/db');

const { APP_URL } = process.env;

const countVehicle = (data, cb) => {
  db.query(`SELECT COUNT(*) as total FROM vehicles WHERE brand LIKE '${data.search}%'`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getVehicles = (data, cb) => {
  db.query(`SELECT id_vehicle, id_category, type, brand , CONCAT('${APP_URL}/', image) AS image, capacity, location, price, qty, payment, rent_count, status, createdAt, updatedAt
  FROM vehicles WHERE brand LIKE '${data.search}%' 
  LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const countVehicleCategory = (data, cb) => {
  let sort = '';
  if (data.sort === 'popular') {
    sort = 'ORDER BY v.rent_count DESC';
  }
  if (data.sort === 'latest') {
    sort = 'ORDER BY v.id_vehicle DESC';
  }
  db.query(`SELECT COUNT(*) as total FROM vehicles v
  LEFT JOIN categories c ON c.id_category=v.id_category
  WHERE v.location LIKE '${data.location}%' AND (v.brand LIKE '${data.search}%' OR c.type LIKE '${data.search}%') AND (v.price >= ${data.minimum} AND v.price <= ${data.maximum}) AND payment >= ${data.prepayment}
  ${sort}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getVehicleCategory = (data, cb) => {
  let sort = '';
  if (data.sort === 'popular') {
    sort = 'ORDER BY v.rent_count DESC';
  }
  if (data.sort === 'latest') {
    sort = 'ORDER BY v.id_vehicle DESC';
  }
  db.query(`SELECT v.id_vehicle, v.id_category, v.type, v.brand , CONCAT('${APP_URL}/', v.image) AS image, v.capacity, v.location, v.price, v.qty, v.payment, v.rent_count, v.status, v.createdAt, v.updatedAt
  FROM vehicles v 
  LEFT JOIN categories c ON v.id_category = c.id_category 
  WHERE v.location LIKE '${data.location}%' AND (v.brand LIKE '${data.search}%' OR c.type LIKE '${data.search}%') AND (v.price >= ${data.minimum} AND v.price <= ${data.maximum}) AND payment >= ${data.prepayment}
  ${sort} LIMIT ${data.limit} OFFSET ${data.offset};
  `, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getVehicle = (id, cb) => {
  db.query(`SELECT id_vehicle, id_category, type, brand , CONCAT('${APP_URL}/', image) AS image, capacity, location, price, qty, payment, rent_count, status, createdAt, updatedAt
  FROM vehicles WHERE id_vehicle=?`, [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getVehicleAsync = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT id_vehicle, id_category, type, brand , CONCAT('${APP_URL}/', image) AS image, capacity, location, price, qty, payment, rent_count, status, createdAt, updatedAt
  FROM vehicles WHERE id_vehicle=?`, [id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

const checkVehicle = (data, cb) => {
  db.query(`SELECT * FROM vehicles WHERE type='${data.type}' AND brand='${data.brand}' AND capacity='${data.capacity}' 
  AND location='${data.location}' AND price=${data.price} AND qty=${data.qty}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const newVehicle = () => new Promise((resolve, reject) => {
  db.query(`SELECT id_vehicle, id_category, type, brand , CONCAT('${APP_URL}/', image) AS image, capacity, location, price, qty, payment, rent_count, status, createdAt, updatedAt
  FROM vehicles ORDER BY id_vehicle DESC LIMIT 2`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

const addVehicle = (data, cb) => {
  db.query('INSERT INTO vehicles SET ?', [data], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const editAllVehicle = (data, id, cb) => {
  db.query('UPDATE vehicles SET ? WHERE id_vehicle=?;', [data, id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const editVehicle = (data, id) => new Promise((resolve, reject) => {
  db.query('UPDATE vehicles SET ? WHERE id_vehicle=?', [data, id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

const deleteVehicle = (id, cb) => {
  db.query('DELETE FROM vehicles WHERE id_vehicle=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const addRentCount = (id) => {
  db.query(`UPDATE vehicles SET rent_count=rent_count+1 WHERE id_vehicle=${id};`);
};

const decrementCount = (id) => new Promise((resolve, reject) => {
  db.query(`UPDATE vehicles SET rent_count=rent_count-1 WHERE id_vehicle=${id};`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

module.exports = {
  countVehicle,
  getVehicles,
  countVehicleCategory,
  getVehicleCategory,
  getVehicle,
  getVehicleAsync,
  checkVehicle,
  newVehicle,
  addVehicle,
  editAllVehicle,
  editVehicle,
  deleteVehicle,
  addRentCount,
  decrementCount,
};
