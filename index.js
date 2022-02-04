const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.urlencoded({
    extended: true
}));

app.use(require('./src/routes'));

app.listen (PORT, () => {
    console.log(`App Listening on port ${PORT}`);
});