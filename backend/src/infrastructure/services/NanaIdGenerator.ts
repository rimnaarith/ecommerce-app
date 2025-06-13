import { IDGenerator } from "@/application/interfaces/IDGenerator.js";
import { injectable } from "tsyringe";

@injectable()
export class NanoIDGenerator implements IDGenerator {
  async gen(): Promise<string> {
    const { nanoid } = await import('nanoid');
    return nanoid();
  }
}