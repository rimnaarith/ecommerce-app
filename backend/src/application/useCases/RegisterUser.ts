import { UserRepository } from "@/domain/repositories/UserRepository";
import { AppError } from "@/shared/errors";
import { TOKENS } from "@/tokens";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

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

    return this.userRepository.save(input);
  }
}