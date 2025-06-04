import { User } from "../entities/User";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(userData: {email: string, password: string, name: string}): Promise<User>;
}