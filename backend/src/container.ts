import { container } from "tsyringe";
import { UserRepository } from "./domain/repositories/UserRepository";
import { UserPrismaRepository } from "./infrastructure/repositories/UserPrismaRepository";
import { TOKENS } from "./tokens";


container.register<UserRepository>(TOKENS.UserRepository, { useClass: UserPrismaRepository });
