export interface IDGenerator {
  gen(): Promise<string>
}