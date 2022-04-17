const fs = require('fs');

const unlink = (req) => {
    if (req.file) {
        fs.unlink(`${req.file.path}`, (error) => {
            if (error) throw error;
        });
    }
};

const rm = (result) => {
    if (result[0].image !== null) {
        const arrImage = result[0].image.split('/');
        const fileImage = arrImage[arrImage.length - 1];
        fs.rm(fileImage, {}, (err) => {
            if (err) throw err;
        });
    }
};

module.exports = { unlink, rm };
