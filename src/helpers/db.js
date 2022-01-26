const mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vehicle_rent'
})

conn.connect()

module.exports = conn