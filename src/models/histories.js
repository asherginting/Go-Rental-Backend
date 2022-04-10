const db = require('../helpers/db');

const { APP_URL } = process.env;

const countHistory = (data, cb) => {
  db.query(`SELECT COUNT(*) AS total FROM histories h 
  LEFT JOIN vehicles v ON h.id_vehicle =v.id_vehicle 
  LEFT JOIN users u ON h.id_user = u.id_user
  WHERE v.type LIKE '${data.search}%' OR v.brand LIKE '${data.search}%' OR v.location LIKE '${data.search}%' OR u.name LIKE '${data.search}%' OR u.username LIKE '${data.search}%'
  `, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getHistories = (data, cb) => {
  db.query(`SELECT id_history, h.id_user, u.name, u.username, u.phone_number, v.id_vehicle, v.type, CONCAT('${APP_URL}/', v.image) AS image, v.brand, v.location, h.rent_start_date, h.rent_end_date, prepayment, h.status, h.createdAt, h.updatedAt 
  FROM histories h LEFT JOIN users u ON h.id_user = u.id_user LEFT JOIN vehicles v ON h.id_vehicle = v.id_vehicle 
  WHERE v.type LIKE '${data.search}%' OR v.brand LIKE '${data.search}%' OR v.location LIKE '${data.search}%' OR u.name LIKE '${data.search}%' OR u.username LIKE '${data.search}%' OR h.createdAt LIKE '${data.search}%'
  ORDER by h.id_history DESC
  LIMIT ${data.limit} OFFSET ${data.offset};`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const countHistoryFilter = (data, cb) => {
  db.query(`SELECT COUNT(*) AS total FROM histories h 
  LEFT JOIN vehicles v ON h.id_vehicle =v.id_vehicle 
  LEFT JOIN users u ON h.id_user = u.id_user
  WHERE v.type LIKE '${data.type}%' AND v.location LIKE '${data.location}%' AND h.createdAt LIKE '${data.rentStartDate}%'
  `, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getHistoriesFilter = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT id_history, h.id_user, u.name, u.username, u.phone_number, v.id_vehicle, v.type, CONCAT('${APP_URL}/', v.image) AS image, v.brand, v.location, h.rent_start_date, h.rent_end_date, prepayment, h.status, h.createdAt, h.updatedAt 
  FROM histories h LEFT JOIN users u ON h.id_user = u.id_user LEFT JOIN vehicles v ON h.id_vehicle = v.id_vehicle 
  WHERE v.type LIKE '${data.type}%' AND v.location LIKE '${data.location}%' AND h.createdAt LIKE '${data.createdAt}%'
  ORDER by h.id_history ${data.sort} LIMIT ${data.limit} OFFSET ${data.offset};`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

const countHistoryByUsername = (username, data, cb) => {
  db.query(`SELECT COUNT(*) AS total FROM histories h 
  LEFT JOIN vehicles v ON h.id_vehicle =v.id_vehicle 
  LEFT JOIN users u ON h.id_user = u.id_user
  WHERE u.username='${username}' AND v.type LIKE '${data.search}%'
  `, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getHistoriesByUsername = (username, data, cb) => {
  db.query(`SELECT id_history, h.id_user, u.name, u.username, u.phone_number, v.id_vehicle, v.type, v.brand, v.location, h.rent_start_date, h.rent_end_date, prepayment, h.status, h.createdAt, h.updatedAt 
  FROM histories h LEFT JOIN users u ON h.id_user = u.id_user LEFT JOIN vehicles v ON h.id_vehicle = v.id_vehicle 
  WHERE u.username='${username}' AND v.type LIKE '${data.search}%'
  ORDER by h.id_history ASC
  LIMIT ${data.limit} OFFSET ${data.offset};`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getHistory = (id, cb) => {
  db.query(`SELECT id_history, h.id_user, u.name, u.username, u.phone_number, v.id_vehicle, v.type, v.brand, v.location, h.rent_start_date, h.rent_end_date, prepayment, h.status, h.createdAt, h.updatedAt 
  FROM histories h LEFT JOIN users u ON h.id_user = u.id_user LEFT JOIN vehicles v ON h.id_vehicle = v.id_vehicle  
  WHERE id_history=?`, [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getHistoryUser = (idHistory, idUser) => new Promise((resolve, reject) => {
  db.query(`SELECT id_history, h.id_user, u.name, u.username, u.phone_number, v.id_vehicle, v.type, v.brand, v.location,CONCAT('${APP_URL}/', v.image) AS image, v.price, h.rent_start_date, h.rent_end_date, prepayment, h.status, h.createdAt, h.updatedAt 
  FROM histories h LEFT JOIN users u ON h.id_user = u.id_user LEFT JOIN vehicles v ON h.id_vehicle = v.id_vehicle  
  WHERE h.id_history=? AND h.id_user=?`, [idHistory, idUser], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

const getHistoryAsync = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT id_history, h.id_user, u.name, u.username, u.phone_number, v.id_vehicle, v.type, v.brand, v.location, CONCAT('${APP_URL}/', v.image) AS image, h.rent_start_date, h.rent_end_date, prepayment, h.status, h.createdAt, h.updatedAt 
  FROM histories h LEFT JOIN users u ON h.id_user = u.id_user LEFT JOIN vehicles v ON h.id_vehicle = v.id_vehicle  
  WHERE id_history=?`, [id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

const newHistory = (cb) => {
  db.query(`SELECT id_history, h.id_user, u.name, u.username, u.phone_number, v.id_vehicle, v.type, v.brand, v.location, h.rent_start_date, h.rent_end_date, prepayment, h.status, h.createdAt, h.updatedAt 
  FROM histories h LEFT JOIN users u ON h.id_user = u.id_user LEFT JOIN vehicles v ON h.id_vehicle = v.id_vehicle 
  ORDER BY h.id_history DESC LIMIT 1`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

// const addHistory = (data, cb) => {
//   db.query('INSERT INTO histories SET ?', [data], (err, res) => {
//     if (err) throw err;
//     cb(res);
//   });
// };

const addHistory = (data) => new Promise((resolve, reject) => {
  db.query('INSERT INTO histories SET ?', [data], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

const editHistory = (data, id, cb) => {
  db.query('UPDATE histories SET ? WHERE id_history=?;', [data, id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const updateHistory = (data, id) => new Promise((resolve, reject) => {
  db.query('UPDATE histories SET ? WHERE id_history=?;', [data, id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

const getHistoryDeleted = (id, cb) => {
  db.query(`SELECT h.id_history, h.rent_start_date, h.rent_end_date, v.id_vehicle 
  FROM histories h LEFT JOIN users u ON h.id_user = u.id_user LEFT JOIN vehicles v ON h.id_vehicle = v.id_vehicle  WHERE id_history=${id}
  `, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const deleteHistory = (id, cb) => {
  db.query('DELETE FROM histories WHERE id_history=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

module.exports = {
  countHistory,
  getHistories,
  countHistoryFilter,
  getHistoriesFilter,
  countHistoryByUsername,
  getHistoriesByUsername,
  getHistory,
  getHistoryUser,
  getHistoryAsync,
  newHistory,
  addHistory,
  editHistory,
  updateHistory,
  getHistoryDeleted,
  deleteHistory,
};
