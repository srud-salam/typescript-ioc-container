import { Person } from "./person.mock";

export class User extends Person {
  constructor(public id: number, person: Person, public passwordHash: string) {
    super(person.firstName, person.lastName, person.age, person.email);
  }

  setUsername(email: string) {
    this.email = email;
  }

  setPassword(encryptPassword: string) {
    this.passwordHash = encryptPassword;
  }
}
