const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(require('./src/routes'));
app.use('/uploads', express.static('uploads'));

const {PORT, APP_PORT} = process.env;

app.listen(PORT || APP_PORT, () => {
    console.log(`App Listening on port ${PORT || APP_PORT}`);
});