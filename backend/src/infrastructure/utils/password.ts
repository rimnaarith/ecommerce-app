import bcrypt from 'bcryptjs';

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function comparePassword(s: string, hash: string) {
  return await bcrypt.compare(s, hash)
}

export {
  hashPassword,
  comparePassword
}