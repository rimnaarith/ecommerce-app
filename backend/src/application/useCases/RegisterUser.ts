import { UserRepository } from "@/domain/repositories/UserRepository";
import { AppError } from "@/shared/errors";
import { TOKENS } from "@/main/tokens";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";
import { User } from "@/domain/entities/User";

@injectable()
export class RegisterUser {
  constructor(
    @inject(TOKENS.UserRepository) private userRepository: UserRepository
  ) {}

  async execute(input: {email: string, name: string, password: string}) {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new AppError('Email already exists', StatusCodes.CONFLICT);
    }
    const user = User.fromObj({
      id: '', // TODO: generate id
      username: null, //TODO: check input is email or username
      hashedPassword: '', //TODO: hash password
      name: input.name,
      email: null, //TODO: check input is email or username
      profileImgName: null,
      role: 'USER',
      updateAt: new Date(),
      createAt: new Date()
    })

    return this.userRepository.save(user);
  }
}