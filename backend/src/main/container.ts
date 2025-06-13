import { container } from "tsyringe";
import { UserRepository } from "../domain/repositories/UserRepository.js";
import { UserPrismaRepository } from "../infrastructure/repositories/UserPrismaRepository.js";
import { TOKENS } from "./tokens.js";
import { PasswordHasher } from "@/application/interfaces/PasswordHasher.js";
import { BcryptHasher } from "@/infrastructure/services/BcryptHasher.js";
import { IDGenerator } from "@/application/interfaces/IDGenerator.js";
import { NanoIDGenerator } from "@/infrastructure/services/NanaIdGenerator.js";


container.register<UserRepository>(TOKENS.UserRepository, { useClass: UserPrismaRepository });
container.register<PasswordHasher>(TOKENS.PasswordHasher, { useClass: BcryptHasher });
container.register<IDGenerator>(TOKENS.IDGenerator, { useClass: NanoIDGenerator });
