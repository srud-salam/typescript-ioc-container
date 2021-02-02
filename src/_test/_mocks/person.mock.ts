export interface IPerson {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  printName(): void;
  printAge(): void;
}

export class Person implements IPerson {
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
    public email: string
  ) {}

  public printName(): void {
    console.log(`${this.firstName} ${this.lastName}`);
  }

  public printAge(): void {
    console.log(`the age of ${this.firstName} is ${this.age}`);
  }
}
