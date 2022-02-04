/* eslint-disable max-len */
const db = require('../helpers/db');

const countCategory = (data, cb) => {
    db.query(`SELECT COUNT(*) AS total FROM categories c 
  LEFT JOIN vehicles v ON c.id_category=v.id_category 
  WHERE name LIKE '${data.search}%';`, (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

const getCategories = (data, cb) => {
    db.query(`SELECT c.id_category, c.name, v.brand, v.capacity, v.location, v.price, v.qty, v.rent_count, c.createdAt, c.updatedAt FROM categories c 
  LEFT JOIN vehicles v ON c.id_category=v.id_category 
  WHERE c.name LIKE '${data.search}%'
  LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

const checkCategories = (data, cb) => {
    db.query(`SELECT * FROM categories WHERE name='${data}'`, (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

const newCategory = (cb) => {
    db.query('SELECT * FROM categories ORDER BY id_category DESC LIMIT 1', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

const addCategory = (data, cb) => {
    db.query(`INSERT INTO categories (name) VALUES ('${data}')`, (err) => {
        if (err) throw err;
        cb();
    });
};

const editCategory = (data, id, cb) => {
    db.query('UPDATE categories SET name=?  WHERE id_category=?;', [data, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

const getCategory = (id, cb) => {
    db.query('SELECT * from categories WHERE id_category=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

const deleteCategory = (id, cb) => {
    db.query('DELETE FROM categories WHERE id_category=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

module.exports = {
    countCategory,
    getCategories,
    checkCategories,
    newCategory,
    addCategory,
    editCategory,
    getCategory,
    deleteCategory,
};
