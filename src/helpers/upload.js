const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const _file = file.originalname.split('.');
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${_file[0]}-${uniqueSuffix}.${_file[_file.length - 1]}`);
    },
});

const fileFilter = (req, file, cb) => {
    const imageFile = [
        'image/jpeg', 
        'image/png', 
        'image/gif'
    ];

    if (!imageFile.includes(file.mimetype)) {
        cb(new Error('Image type mismatch'), false);
    } else {
        cb(null, true);
    }
};

const upload = multer({ 
    storage: storage, 
    fileFilter,
    limits: {
        fileSize: 2097152 // max file 2MB
    }
});

module.exports = upload;
