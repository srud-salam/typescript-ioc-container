import Container from "./_model";
import { IPerson, Person } from "./_test/_mock/person.mock";
import { User } from "./_test/_mock/user.mock";

const person: IPerson = new Person(
  "Srud",
  "Salam",
  35,
  "srud.salam@outlook.com"
);

const user = new User(1, person, "password");

const container = new Container();
container.register(Person, person);
const person1 = container.bind(Person);
console.log(person1);

container.register(User, user);
const user1 = container.bind(User);
console.log(user1);

console.log(new Date());
