// const { StatusCodes } = require('http-status-codes');
const { AVATAR_DIR } = require('../../constants');
const StorageService = require('./service');

exports.saveAvatarImage = async (req, res, next) => {
  try {
    await StorageService.saveAvatarImage(req);
    // res.status(StatusCodes.ACCEPTED).json({ message: 'Uploaded' });
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
};
exports.getAvatarImage = async (req, res, next) => {
  try {
    const fileName = await StorageService.getAvatarImage(req);
    res.sendFile(fileName, { root: AVATAR_DIR });
  } catch (error) {
    next(error);
  }
};
