import type { UserRepository } from '@/domain/repositories/UserRepository.js';
import { AppError } from '@/shared/errors/AppError.js';
import { TOKENS } from '@/main/tokens.js';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { User } from '@/domain/entities/User.js';
import type { PasswordHasher } from '../interfaces/PasswordHasher.js';
import type { IDGenerator } from '../interfaces/IDGenerator.js';

@injectable()
export class RegisterUser {
  constructor(
    @inject(TOKENS.UserRepository) private userRepository: UserRepository,
    @inject(TOKENS.PasswordHasher) private passworHasher: PasswordHasher,
    @inject(TOKENS.IDGenerator) private idGenerator: IDGenerator,
  ) {}

  async execute(input: {emailOrUsername: string, name: string, password: string}) {
    const existingUser = await this.userRepository.findByEmailOrUsername(input.emailOrUsername);
    const isEmail = input.emailOrUsername.includes('@');
    if (existingUser) {
      throw new AppError((isEmail ? 'Email' : 'Username') + ' already exists', StatusCodes.CONFLICT);
    }
    const user = User.fromObj({
      id: await this.idGenerator.gen(),
      username: !isEmail ? input.emailOrUsername : null,
      hashedPassword: await this.passworHasher.hash(input.password),
      name: input.name,
      email: isEmail ? input.emailOrUsername : null,
      profileImgName: null,
      role: 'USER',
      updateAt: new Date(),
      createAt: new Date()
    });

    return this.userRepository.save(user);
  }
}