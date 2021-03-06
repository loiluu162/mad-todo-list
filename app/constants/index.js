const EMAIL_CONFIRMATION_PURPOSE = 'EMAIL_CONFIRMATION';
const PASSWORD_RESET_PURPOSE = 'PASSWORD_RESET';
const AVATAR_DIR = './public/upload/avatars';
const IMAGE_EXT_REG = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

const DEFAULT_MAX_AGE_SESSION = 24 * 60 * 60 * 1000;

module.exports = {
  AVATAR_DIR,
  EMAIL_CONFIRMATION_PURPOSE,
  PASSWORD_RESET_PURPOSE,
  IMAGE_EXT_REG,
  DEFAULT_MAX_AGE_SESSION,
};
