const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bloomskill_event',
    resource_type: 'auto',
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
  },
  filename: (req, res, cb) => {
    cb(null, res.originalname);
  },
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
});

const uploadEventCloud = multer({ storage });

module.exports = uploadEventCloud;
