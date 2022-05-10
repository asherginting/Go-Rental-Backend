const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const fs = require('fs');

const {
    CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET, ENVIRONMENT,
} = process.env;

let storage = null;

if (ENVIRONMENT === 'production') {
    cloudinary.config({
        cloud_name: CLOUD_NAME,
        api_key: CLOUD_API_KEY,
        api_secret: CLOUD_API_SECRET,
    });

    storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'go-rental/uploads',
            // eslint-disable-next-line no-unused-vars
            format: async (req, file) => 'jpg',
            public_id: async (req, file) => {
                const timestamp = Date.now();
                return `${file.originalname.split('.')[0]}-${timestamp}`;
            },
        },
    });
} else {
    storage = multer.diskStorage({
        destination(req, file, cb) {
            // eslint-disable-next-line no-unused-vars
            fs.mkdir('./uploads/', (err) => {
                cb(null, './uploads/');
            });
        },
        filename(req, file, cb) {
            const _file = file.originalname.split('.');
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
            cb(null, `${_file[0]}-${uniqueSuffix}.${_file[_file.length - 1]}`);
        },
    });
}

const fileFilter = (req, file, cb) => {
    const typeImage = ['image/jpeg', 'image/png', 'image/jpg'];
    const fileSize = parseInt(req.headers['content-length'], 10);

    if (!typeImage.includes(file.mimetype)) {
        cb(new Error('Image type mismatch'), false);
    } else if (fileSize >= 2000000) {
        cb(new Error('Max Image Size 2MB!'), false);
    } else {
        cb(null, true);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
