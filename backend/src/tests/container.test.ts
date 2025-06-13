import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "@/domain/repositories/UserRepository.js";
import { UserPrismaRepository } from "@/infrastructure/repositories/UserPrismaRepository.js";
import { TOKENS } from "@/main/tokens.js";


container.register<UserRepository>(TOKENS.UserRepository, { useClass: UserPrismaRepository });


describe("DI Container", () => {
  it("should resolve UserPrismaRepository for UserRepository", () => {
    const repo1 = container.resolve(TOKENS.UserRepository);

    expect(repo1).toBeInstanceOf(UserPrismaRepository);
  });
});