const multer = require('multer');

module.exports = {
  uploadPicture: () => {
    const storage = multer.diskStorage({
        destination: './static',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        }
    });
    const upload = multer({ storage });
    return upload;
}
}