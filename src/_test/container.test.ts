import Container from "../_model";
import { IContainer } from "../_interface";
import { IPerson, Person } from "./_mock/person.mock";
jest.mock("../_model");

describe("Container", () => {
  let container: IContainer;
  const person: IPerson = new Person(
    "Srud",
    "Salam",
    35,
    "srud.salam@outlook.com"
  );
  const containerMock = Container as jest.MockedClass<typeof Container>;

  beforeEach(() => {
    containerMock.mockClear();
    container = new Container();
  });

  afterEach(() => {
    container = {} as Container;
  });

  it("should be able to instantiated", () => {
    expect(container).toBeInstanceOf(Container);
  });

  it("should call the class constructor once", () => {
    expect(Container).toHaveBeenCalledTimes(1);
  });

  it("should the constructor creates the object", () => {
    expect(container).toBeTruthy();
  });

  describe("Container Methed", () => {
    it("should register a class with no error", () => {
      expect(() => container.register(Person, person)).not.toThrow();
    });

    it("should register a class with no error", () => {
      expect(() => container.register(Person, person)).not.toThrow();
    });

    it("should register an instance ", () => {
      const spy = jest.spyOn(container, "register");

      container.register(Person, person);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(Person, person);
    });

    it("should bind an instance ", () => {
      const spy = jest.spyOn(container, "register");
      //container.register(Person, person);

      const spy1 = jest.spyOn(container, "bind");
      const person1 = container.bind<Person>(Person);

      console.log(spy1.mock.calls[0][0], person1);

      expect(spy).toHaveBeenCalledTimes(1);
      //expect(spy1.mock.calls[0][0]).toHaveBeenCalledWith(person1);
    });

    // it("should not allow to register a class twice or have duplicate", () => {
    //   const spy = jest
    //     .spyOn(container, "register")
    //     .mockImplementation(() => container.register(Person, person))
    //     .mockImplementation(() => container.register(Person, person));

    //   expect(container.register(Person, person)).toBe(person);

    //   // const myMockFn = jest
    //   //   .fn(() => "default")
    //   //   .mockImplementationOnce(() => "first call")
    //   //   .mockImplementationOnce(() => "second call");

    //   // console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());

    //   // const mockFn = jest
    //   //   .fn((p) => container.register(Person, p))
    //   //   .mockImplementationOnce((p) => p)
    //   //   .mockImplementationOnce((p) => p);

    //   // console.log(
    //   //   mockFn(person),
    //   //   mockFn(person),
    //   //   mockFn(person),
    //   //   mockFn(person)
    //   // );

    //   // expect(mockFn).toThrow();
    // });
  });
});
