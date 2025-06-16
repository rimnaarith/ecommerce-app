import { PasswordHasher } from '@/application/interfaces/PasswordHasher.js';
import { injectable } from 'tsyringe';
import bcrypt from 'bcryptjs';

@injectable()
export class BcryptHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async compare(raw: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(raw, hash);
  }
}