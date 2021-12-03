const express = require('express');
const { AVATAR_DIR } = require('../../constants');
const router = express.Router();
const multer = require('multer');
const StorageController = require('./controller');
const { authenticationMiddleware } = require('../../middlewares/');

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, AVATAR_DIR);
  },
  filename: function (request, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.use(authenticationMiddleware);

router.post(
  '/avatar',
  upload.single('avatar'),
  StorageController.saveAvatarImage
);

router.get('/avatar/:file', StorageController.getAvatarImage);

module.exports = router;
