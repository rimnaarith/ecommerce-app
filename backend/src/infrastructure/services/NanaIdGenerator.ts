import { IDGenerator } from '@/application/interfaces/IDGenerator.js';
import { injectable } from 'tsyringe';
import { nanoid } from 'nanoid';

@injectable()
export class NanoIDGenerator implements IDGenerator {
  gen() {
    return nanoid();
  }
}