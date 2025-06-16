import { injectable } from 'tsyringe';

import { User } from '@/domain/entities/User.js';
import prisma from '../prisma/client.js';
import { UserRepository } from '@/domain/repositories/UserRepository.js';
import { Users } from '@prisma/client';
@injectable()
export class UserPrismaRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.users.findFirst({
      where: {
        email: email
      }
    });
    return user ? this.toUserEntity(user) : null;
  }

  async findByEmailOrUsername(emailOrUsername: string): Promise<User | null> {
    const user = await prisma.users.findFirst({
      where: {
        AND: [
          {
            OR: [
              {username: emailOrUsername},
              {email: emailOrUsername}
            ]
          }
        ]
      }
    });
    return user ? this.toUserEntity(user) : null;
  }

  async save(user: User): Promise<User> {
    const saved = await prisma.users.create({
      data: {
        name: user.name,
        password: user.hashedPassword,
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
    return this.toUserEntity(saved);
  }
  private toUserEntity(prismaUser: Users) {
    return User.fromObj(
      {
        id: prismaUser.id,
        username: prismaUser.username,
        hashedPassword: prismaUser.password,
        name: prismaUser.name,
        email: prismaUser.email,
        profileImgName: prismaUser.profileImgName,
        role: prismaUser.role,
        updateAt: prismaUser.updateAt,
        createAt: prismaUser.createAt
      }
    );
  }
}