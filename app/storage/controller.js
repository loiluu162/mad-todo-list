const { StatusCodes } = require('http-status-codes');
const StorageService = require('./service');

exports.saveAvatarImage = async (req, res, next) => {
  try {
    await StorageService.saveAvatarImage(req);
    res.status(StatusCodes.ACCEPTED).json({ message: 'Uploaded' });
  } catch (error) {
    next(error);
  }
};
