/* eslint-disable max-len */
const db = require('../helpers/db');

const countCategory = (data, cb) => {
  db.query(`SELECT COUNT(*) AS total FROM categories
  WHERE type LIKE '${data.search}%';`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getCategories = (data, cb) => {
  db.query(`SELECT * FROM categories 
    WHERE type LIKE '${data.search}%'
    LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const countCategoryData = (data, cb) => {
  db.query(`SELECT COUNT(*) AS total FROM categories c 
  LEFT JOIN vehicles v ON c.id_category=v.id_category 
  WHERE c.type LIKE '${data.search}%';`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getCategoriesData = (data, cb) => {
  db.query(`SELECT c.id_category, c.type, v.brand, v.capacity, v.location, v.price, v.qty, v.rent_count, c.createdAt, c.updatedAt FROM categories c 
  LEFT JOIN vehicles v ON c.id_category=v.id_category 
  WHERE c.type LIKE '${data.search}%'
  LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
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

const getCategoriesType = (cb) => {
  db.query('SELECT type FROM categories', (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const checkCategories = (data, cb) => {
  db.query(`SELECT * FROM categories WHERE type='${data}'`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getTypeIdCategories = (cb) => {
  db.query(`SELECT id_category, type
  FROM categories`, (err, res) => {
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
  db.query(`INSERT INTO categories (type) VALUES ('${data}')`, (err) => {
    if (err) throw err;
    cb();
  });
};

const editCategory = (data, id, cb) => {
  db.query('UPDATE categories SET type=?  WHERE id_category=?;', [data, id], (err, res) => {
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
  countCategoryData,
  getCategoriesData,
  getCategoriesType,
  checkCategories,
  getTypeIdCategories,
  newCategory,
  addCategory,
  editCategory,
  getCategory,
  deleteCategory,
};
