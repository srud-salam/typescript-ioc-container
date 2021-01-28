import { IRegister } from "../_interface";

export default class Register<T, Tokens> implements IRegister<T, Tokens> {
  protected instance: { [t in keyof Tokens]: T };

  constructor(init: { [t in keyof Tokens]: T } | null) {
    this.instance = init || ({} as any);
  }

  public has(token: string): boolean {
    return this.instance.hasOwnProperty(token);
  }

  public get(token: keyof Tokens): T | undefined {
    return this.instance[token];
  }

  public set(token: keyof Tokens, value: T): void {
    this.instance[token] = value;
  }
}
