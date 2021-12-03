const express = require('express');
const { AVATAR_DIR } = require('../../constants');
const router = express.Router();
const multer = require('multer');
const StorageController = require('./controller');

const ErrorsHandler = require('./errors');

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, AVATAR_DIR);
  },
  filename: function (request, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  '/avatar',
  upload.single('avatar'),
  StorageController.saveAvatarImage
);

router.get('/avatar/:file', StorageController.getAvatarImage);

router.use(ErrorsHandler);

module.exports = router;
