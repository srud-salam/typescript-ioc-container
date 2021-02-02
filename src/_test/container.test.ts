import Container from "../_models";
import { IPerson, IUserSession, Person, User, UserSession } from "./_mocks";

describe("Container", () => {
  //Initial setup
  let container: Container;
  const person: IPerson = new Person(
    "Srud",
    "Salam",
    35,
    "srud.salam@outlook.com"
  );
  const user = new User(1, person, "password");
  const userSession: IUserSession = new UserSession(
    11,
    11,
    new Date("2021-02-02T01:35:55"),
    new Date("2021-02-02T01:35:55"),
    new Date("2021-02-02T01:35:55")
  );

  beforeEach(() => {
    container = new Container();
  });

  // test the Container constructor
  describe("Container Constructor", () => {
    it("should be able to instantiate it", () => {
      expect(container).toBeInstanceOf(Container);
    });
    it("should the constructor creates the container object", () => {
      expect(container).toBeTruthy();
    });
  });

  // test the Container Registry methods
  describe("Container Registry Methed", () => {
    it("should register a class with no error", () => {
      const mockRegister = jest
        .fn()
        .mockImplementationOnce(() => container.register(Person, person));
      expect(mockRegister).not.toThrow();
      expect(mockRegister).toHaveBeenCalledTimes(1);
    });
    it("Empty registery detected", () => {
      const mockRegister = jest
        .fn()
        .mockImplementationOnce(() => container.register(Person, undefined));

      expect(mockRegister).toThrow("Empty registery detected");
      expect(mockRegister).toHaveBeenCalledTimes(1);
    });
    it("should detect invalid class reference", () => {
      const mockRegister = jest
        .fn()
        .mockImplementationOnce(() => container.register(Person, user));

      expect(mockRegister).toThrow("Invalid class reference detected");
      expect(mockRegister).toHaveBeenCalledTimes(1);
    });
    it("should not allow to register a class twice or have duplicate", () => {
      const mockRegisters = jest
        .fn()
        .mockImplementationOnce(() =>
          container.register<IPerson>(Person, person)
        )
        .mockImplementationOnce(() =>
          container.register<IPerson>(Person, person)
        );

      //execute once
      mockRegisters();
      expect(mockRegisters).toThrow("duplicate class registration not allowed");
      expect(mockRegisters).toHaveBeenCalledTimes(2);
    });

    it("should allow to register two seperate classes", () => {
      const mockRegisters = jest
        .fn()
        .mockImplementationOnce(() => container.register(Person, person))
        .mockImplementationOnce(() => container.register(User, user));

      expect(mockRegisters).not.toThrow();
      expect(mockRegisters).not.toThrow();
      expect(mockRegisters).toHaveBeenCalledTimes(2);
    });
  });

  // test the Container Registry methods
  describe("Container Bind Methed", () => {
    beforeEach(() => {
      container.register<IUserSession>(UserSession, userSession);
      container.register<IPerson>(Person, person);
      container.register(User, user);
    });
    it("should allow to retreive an instance of class", () => {
      const mockBind = jest.fn().mockReturnValue(container.bind(Person));

      expect(mockBind()).toBe(person);
      expect(mockBind).toHaveBeenCalledTimes(1);
    });
    it("should allow bind to multiple instance of class", () => {
      const mockBind = jest
        .fn()
        .mockReturnValueOnce(container.bind(Person))
        .mockReturnValueOnce(container.bind(User))
        .mockReturnValueOnce(container.bind(UserSession));

      expect(mockBind()).toEqual(person);
      expect(mockBind()).toEqual(user);
      expect(mockBind()).toEqual(userSession);
      expect(mockBind).toHaveBeenCalledTimes(3);
    });
    it("should not bind to unregistered class", () => {
      const mockBind = jest
        .fn()
        .mockImplementationOnce(() => container.bind(String));

      expect(mockBind).toThrow("Can not bind to String");
    });
  });
});
