const db = require('../helpers/db');

const getStatus = (id, cb) => {
  db.query('SELECT * FROM status WHERE id_status=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

module.exports = getStatus;
