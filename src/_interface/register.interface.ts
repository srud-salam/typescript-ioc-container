export interface IRegister<T, Tokens = any> {
  has(token: string): boolean;
  get(token: keyof Tokens): T | undefined;
  set(token: keyof Tokens, value: T): void;
}
