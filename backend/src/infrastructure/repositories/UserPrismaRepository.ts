import { injectable } from 'tsyringe';

import { User } from '@/domain/entities/User';
import prisma from '../prisma/client';
import { UserRepository } from "@/domain/repositories/UserRepository";

@injectable()
export class UserPrismaRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.users.findFirst({
      where: {
        email: email
      }
    });
  }

  async save(userData: { email: string; password: string; name: string; }): Promise<User> {
    const user = await prisma.users.create({
      data: {
        name: userData.name,
        password: userData.password,
        userId: userData.email,
        username: userData.email,
        email: userData.email
      }
    })
    return user;
  }

}