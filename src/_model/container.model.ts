import "reflect-metadata";
import { IContainer, IRegister } from "../_interface";
import { Constructor, Token } from "../_types";
import Register from "./register.model";

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
    const classToken = this.registrations.get(className);

    if (classToken) return classToken;

    const classParams = this.checkForCyclicDependency(classToken);
    const classInstance = new classToken(...classParams);

    this.registrations.set(classInstance.constructor.name, classInstance);
    return classInstance;
  }

  private getToken(token: Token): string {
    return typeof token === "string"
      ? token
      : (token.prototype.constructor.name as string);
  }

  private checkForCyclicDependency(classToken: any) {
    const params = Reflect.getMetadata("design:paramtypes", classToken);
    const classParams = params.map((constructor: Constructor) => {
      if (typeof constructor === undefined) {
        throw new Error("Cyclic dependency detected");
      }
      this.bind(constructor);
    });

    return classParams;
  }
}
