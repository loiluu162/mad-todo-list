const { AVATAR_DIR } = require('../../constants');
const StorageService = require('./service');
const { catchAsync } = require('../../utils');

const saveAvatarImage = catchAsync(async (req, res, next) => {
  await StorageService.saveAvatarImage(req);
  res.redirect('/profile');
});

const getAvatarImage = catchAsync(async (req, res, next) => {
  const fileName = await StorageService.getAvatarImage(req);
  res.sendFile(fileName, { root: AVATAR_DIR });
});

module.exports = { saveAvatarImage, getAvatarImage };
