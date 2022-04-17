const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(require('./src/routes'));
app.use('/uploads', express.static('uploads'));

const { PORT, APP_PORT } = process.env;

app.listen(PORT || APP_PORT, () => {
    console.log(`App running on port ${PORT || APP_PORT}`);
});
