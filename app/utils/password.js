import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hash = async (rawPassword) => {
  return await bcrypt.hash(rawPassword, saltRounds);
};

export const compare = async (rawPassword, hashedPassword) => {
  return await bcrypt.compare(rawPassword, hashedPassword);
};

export default { hash, compare };
