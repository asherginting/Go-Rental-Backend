const express = require('express');
require('dotenv').config();
const multer = require('multer');
const cors = require('cors');

const upload = multer();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(require('./src/routes'));

// app.use('/uploads', express.static('uploads'));

app.use(upload.array());
app.use('/uploads', express.static('uploads'));

const { PORT, APP_PORT } = process.env;

app.listen(PORT || APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${PORT || APP_PORT}`);
});
