import Register from "./register.model";
import { IContainer, IRegister } from "../_interface";
import { Token } from "../_types";

export default class Container implements IContainer {
  registrations: IRegister<any, any>;

  constructor() {
    this.registrations = new Register({});
  }

  register<T>(token: Token, value: T): void {
    const classRef: string = this.getToken(token);

    if (!value && !token) {
      throw new Error("Empty registery detected");
    }

    //@ts-ignore
    if (classRef !== value.constructor.name) {
      throw new Error("Invalid class reference detected");
    }

    if (this.registrations.has(classRef)) {
      throw new Error("duplicate class registration not allowed");
    }

    this.registrations.set(classRef, value);
  }

  bind<T>(token: Token<T>): T {
    const className: string = this.getToken(token);
    const classInstance = this.registrations.get(className);
    return classInstance;
  }

  private getToken(token: Token): string {
    return typeof token === "string"
      ? token
      : (token.prototype.constructor.name as string);
  }
}
