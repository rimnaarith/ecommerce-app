import { User } from '../entities/User.js';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByEmailOrUsername(emailOrUsername: string): Promise<User | null>;
  save(user: User): Promise<User>;
}