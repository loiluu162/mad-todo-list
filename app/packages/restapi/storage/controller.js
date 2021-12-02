// import { StatusCodes} from 'http-status-codes';const { AVATAR_DIR } = require('../../constants');
import { AVATAR_DIR } from '../../../constants/index.js';
import StorageService from './service.js';

const saveAvatarImage = async (req, res, next) => {
  try {
    await StorageService.saveAvatarImage(req);
    // res.status(StatusCodes.ACCEPTED).json({ message: 'Uploaded' });
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
};

const getAvatarImage = async (req, res, next) => {
  try {
    const fileName = await StorageService.getAvatarImage(req);
    res.sendFile(fileName, { root: AVATAR_DIR });
  } catch (error) {
    next(error);
  }
};

export default { saveAvatarImage, getAvatarImage };
