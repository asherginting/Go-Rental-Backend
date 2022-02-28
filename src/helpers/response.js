const fs = require('fs');
const camelCase = require('camelcase-keys');

const response = (req, res, message, results, pageInfo, stats = 200) => {
    let success = true;
    if (stats >= 400) {
        success = false;
        if (req.file) {
            fs.unlink(`${req.file.path}`, (error) => {
                if (error) throw error;
            });
        }
    }
    const data = {
        success,
        message,
    };
    if (results) {
        data.results = camelCase(results);
    }
    if (pageInfo) {
        data.pageInfo = pageInfo;
    }
    return res.status(stats).json(data);
};

module.exports = response;
