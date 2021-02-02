import { IRegister } from "../_interface";
import { Factory } from "../_types";

export default class Register<T, Tokens> implements IRegister<T, Tokens> {
  protected instance: Factory<T, Tokens>;

  constructor(init?: Factory<T, Tokens>) {
    this.instance = init || ({} as Factory<T, Tokens>);
  }

  public has(token: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.instance, token);
  }

  public get(token: keyof Tokens): T | undefined {
    return this.instance[token];
  }

  public set(token: keyof Tokens, value: T): void {
    this.instance[token] = value;
  }
}
