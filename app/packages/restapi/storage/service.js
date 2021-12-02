import path from 'path';
import fs from 'fs';
import { AVATAR_DIR, IMAGE_EXT_REG } from '../../../constants/index.js';

// const IMAGE_DIR = '/app/uploads/avatars';

if (!fs.existsSync(AVATAR_DIR)) {
  fs.mkdirSync(AVATAR_DIR, { recursive: true });
}

const saveAvatarImage = async (req) => {
  const tempPath = req.file.path;
  const { userId } = req.session;
  const targetPath = path.join(AVATAR_DIR, `${userId}.png`);
  const extPart = path.extname(req.file.originalname).toLowerCase();
  if (IMAGE_EXT_REG.test(extPart)) {
    fs.rename(tempPath, targetPath, () => {
      // console.log('OK');
    });
  } else {
    fs.unlink(tempPath, () => {});
    throw new Error('File type not a image');
  }
};

const getAvatarImage = async (req) => {
  let fileName = req.params.file;
  if (!fs.existsSync(path.join(AVATAR_DIR, fileName))) {
    fileName = 'default.png';
  }
  return fileName;
};

export default { saveAvatarImage, getAvatarImage };
