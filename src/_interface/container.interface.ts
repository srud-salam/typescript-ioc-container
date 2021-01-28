import { IRegister } from ".";
import { Token } from "../_types";

export interface IContainer {
  registrations: IRegister<any, any>;
  register<T>(token: Token, value: T): void;
  bind<T>(token: Token<T>): T;
}
