import { IContainer } from "../_interface";
import Container from "../_model";
import { IPerson, Person } from "./_mock";
jest.mock("../_model"); ///Container is now a mock constructor

describe("Container", () => {
  //Initial setup
  const mockContainer = Container as jest.MockedClass<typeof Container>;
  const person: IPerson = new Person(
    "Srud",
    "Salam",
    35,
    "srud.salam@outlook.com"
  );
  let container: IContainer;

  beforeEach(() => {
    mockContainer.mockClear();
    container = new Container();
  });

  afterEach(() => {
    mockContainer.mockClear();
  });

  // test the Container constructor
  describe("Container Constructor", () => {
    it("should be able to instantiate it", () => {
      expect(mockContainer.mock.instances[0]).toBeInstanceOf(Container);
    });

    it("should call the class constructor once", () => {
      expect(mockContainer).toHaveBeenCalledTimes(1);
    });

    it("should the constructor creates the container object", () => {
      expect(mockContainer).toBeTruthy();
    });
  });

  // test the Container Registry methods
  describe("Container Registry Methed", () => {
    it("should register a class with no error", () => {
      container.register(Person, person);
      expect(mockContainer.prototype.register).not.toThrow();
    });

    it("should not allow to register a class twice or have duplicate", () => {
      expect(() => {
        container.register(Person, person);
        container.register(Person, person);
      }).toThrowError();
      expect(mockContainer.prototype.register).toHaveBeenCalledTimes(2);
      expect(mockContainer.prototype.register).toThrowError(
        "duplicate class registration not allowed"
      );
    });

    it("should detect invalid class reference", () => {
      expect(() => {
        container.register(Person, person);
        container.register(Person, person);
      }).toThrowError();
      expect(mockContainer.prototype.register).toHaveBeenCalledTimes(2);
      expect(mockContainer.prototype.register).toThrowError(
        "Invalid class reference detected"
      );
    });

    it("should not allow to register with empty token name", () => {
      expect(() => {
        container.register(Person, person);
        container.register(Person, person);
      }).toThrowError();
      expect(mockContainer.prototype.register).toHaveBeenCalledTimes(2);
      expect(mockContainer.prototype.register).toThrowError(
        "Empty registery detected"
      );
    });
  });

  // test the Container Bind methods
  describe("Container Bind Methed", () => {
    // comming
  });
});
