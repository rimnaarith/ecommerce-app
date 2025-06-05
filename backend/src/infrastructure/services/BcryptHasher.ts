import { hashPassword, comparePassword } from '../utils/password';
import { injectable } from 'tsyringe';

export interface PasswordHasher {
  hash(password: string): Promise<string>;
  compare(raw: string, hash: string): Promise<boolean>;
}

@injectable()
export class BcryptHasher implements PasswordHasher {
  hash(password: string): Promise<string> {
    return hashPassword(password);
  }

  compare(raw: string, hash: string): Promise<boolean> {
    return comparePassword(raw, hash);
  }
}