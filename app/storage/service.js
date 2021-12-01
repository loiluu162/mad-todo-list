const path = require('path');
const fs = require('fs');
const { AVATAR_DIR, IMAGE_EXT_REG } = require('../constants');
const multer = require('multer');

// const IMAGE_DIR = '/app/uploads/avatars';

if (!fs.existsSync(AVATAR_DIR)) {
  fs.mkdirSync(AVATAR_DIR, { recursive: true });
}
exports.saveAvatarImage = async (req) => {
  const tempPath = req.file.path;
  const { userId } = req.session;
  const targetPath = path.join(AVATAR_DIR, `${userId}.png`);
  if (path.extname(req.file.originalname).toLowerCase().match(IMAGE_EXT_REG)) {
    fs.rename(tempPath, targetPath, () => {
      // console.log('OK');
    });
  } else {
    fs.unlink(tempPath, () => {});
    throw new Error('File type not a image');
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

exports.upload = multer({ storage: storage });
