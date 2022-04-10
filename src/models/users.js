const db = require('../helpers/db');

const { APP_URL } = process.env;

const countUsers = (data, cb) => {
  db.query(`SELECT COUNT(*) as total FROM users WHERE name LIKE '${data.search}%'`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getUsers = (data, cb) => {
  db.query(`SELECT id_user, name, username, CONCAT('${APP_URL}/', image) AS image, gender, email, phone_number, address, birthdate, createdAt, updatedAt
  FROM users WHERE name LIKE '${data.search}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getUser = (id, cb) => {
  db.query(`SELECT id_user, name, username, CONCAT('${APP_URL}/', image) AS image, gender, email, phone_number, address, birthdate, createdAt, updatedAt
  FROM users WHERE id_user=?`, [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getUserById = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT id_user, name, username, CONCAT('${APP_URL}/', image) AS image, gender, email, phone_number, address, birthdate, confirm, createdAt, updatedAt
  FROM users WHERE id_user = ?`, [id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

const checkUser = (data, cb) => {
  db.query(`SELECT id_user, name, username, CONCAT('${APP_URL}/', image) AS image, gender, email, phone_number, address, birthdate, createdAt, updatedAt
  FROM users WHERE username='${data.username}' OR email='${data.email}' 
  OR phone_number='${data.phone_number}'`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const checkUserAsync = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT id_user, name, username, CONCAT('${APP_URL}/', image) AS image, gender, email, phone_number, address, birthdate, createdAt, updatedAt
  FROM users WHERE username='${data.username}' OR email='${data.email}' 
  OR phone_number='${data.phone_number}'`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

const newUser = (id, cb) => {
  db.query('SELECT id_user, name, username, email, phone_number FROM users WHERE id_user=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const addUser = (data, cb) => {
  db.query('INSERT INTO users SET ?', [data], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const editUser = (data, id, cb) => {
  db.query('UPDATE users SET ? WHERE id_user=?', [data, id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const deleteUser = (id, cb) => {
  db.query('DELETE FROM users WHERE id_user=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getUserByUserName = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT id_user, username, password, confirm FROM users WHERE username='${data}' OR email='${data}'`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

const editUserByUserName = (username) => new Promise((resolve, reject) => {
  db.query('UPDATE users SET confirm=NULL WHERE username = ?', [username], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

module.exports = {
  countUsers,
  getUsers,
  getUser,
  getUserById,
  checkUser,
  checkUserAsync,
  newUser,
  addUser,
  editUser,
  deleteUser,
  getUserByUserName,
  editUserByUserName,
};
