// const multer = require('multer');
// const path = require('path');

// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// // إعدادات Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDNAME,
//   api_key: process.env.APIKEY,
//   api_secret: process.env.APISECRET
// });


// // إعداد تخزين الملفات
// const storage = multer.diskStorage({
//     cloudinary: cloudinary,
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// // إعداد نوع الملفات المسموح بها
// const fileFilter = (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
//     }
// };

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1024 * 1024 * 5 }, // الحد الأقصى لحجم الملف 5 ميجا بايت
//     fileFilter: fileFilter
// });

// module.exports = upload;

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// إعدادات Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET
});

// إعداد تخزين الملفات في Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // المجلد في Cloudinary حيث سيتم تخزين الملفات
    allowed_formats: ['jpeg', 'jpg', 'png', 'gif'],
    public_id: (req, file) => Date.now() + '_' + file.originalname // اسم الملف في Cloudinary
  }
});

// إعداد نوع الملفات المسموح بها
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // الحد الأقصى لحجم الملف 5 ميجا بايت
  fileFilter: fileFilter
});

module.exports = upload;


