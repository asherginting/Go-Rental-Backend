const db = require('../helpers/db')

exports.getVehicles = (cb) => {
    db.query('SELECT * FROM vehicle', (err, res) => {
        if (err) throw err;
        cb(res)
    })
}

exports.getVehicle = (id, cb) => {
    db.query('SELECT * FROM vehicle WHERE id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res)
    })
}