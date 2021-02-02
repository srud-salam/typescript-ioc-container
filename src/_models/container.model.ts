import { IContainer } from "../_interface";
import { Token } from "../_types";
import Register from "./register.model";

export default class Container implements IContainer {
  registrations: Register<any, any>;

  constructor() {
    this.registrations = new Register();
  }

  register<T>(token: Token<T>, value: T): void {
    if (!value || !token) {
      throw new Error("Empty registery detected");
    }

    const classRef: string = this.getToken(token);
    if (this.registrations.has(classRef)) {
      throw new Error("duplicate class registration not allowed");
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const className: string = value.constructor.name;
    if (classRef !== className) {
      throw new Error("Invalid class reference detected");
    }

    this.registrations.set(classRef, value);
  }

  bind<T>(token: Token<T>): T {
    const className: string = this.getToken(token);
    if (!token) {
      throw new Error("Empty token detected");
    }

    const classInstance = this.registrations.get(className);
    if (!classInstance) {
      throw new Error("Can not bind to " + className);
    }

    return classInstance;
  }

  private getToken<T>(token: Token<T>): string {
    return typeof token === "string"
      ? token
      : (token.prototype.constructor.name as string);
  }
}

export const container = new Container();
