import express from 'express';
import multer from 'multer';
import StorageController from './controller.js';
import { AVATAR_DIR } from '../../../constants/index.js';
import ErrorsHandler from './errors.js';

const router = express.Router();

// const upload = multer({
//   dest: AVATAR_DIR,
//   // you might also want to set some limits: https://github.com/expressjs/multer#limits
// });
// console.log(upload);

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

export default router;
