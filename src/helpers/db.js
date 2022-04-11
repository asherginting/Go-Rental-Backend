const mysql = require('mysql');

const {
    DB_HOST, DB_USER, DB_PASSWORD, DB_NAME,
} = process.env;

const conn = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

conn.connect((err) => {
    if (err) throw err;
    console.log('connection to database is successful');
});

module.exports = conn;

// const mysql = require('mysql');
// require('dotenv').config();

// const {
//     DB_HOST,
//     DB_USER,
//     DB_PASSWORD,
//     DB_NAME
// } = process.env;

// const config = {
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASSWORD,
//     database: DB_NAME
// };

// let connection;

// const handleDisconnect = () => {
//     connection = mysql.createConnection(config);
//     connection.connect((err) => {
//         if (err) {
//             console.log('error when connecting to db:', err);
//             setTimeout(handleDisconnect, 2000);
//         }
//     });

//     connection.on('error', (err) => {
//         console.log('db error', err);
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             handleDisconnect();
//         } else {
//             throw err;
//         }
//     });
// };

// handleDisconnect();
// console.log('db connected');

// module.exports = connection;
