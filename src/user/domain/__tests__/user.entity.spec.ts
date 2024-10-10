import { EntityValidationError } from "../../../shared/domain/validators/validation.error";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { User } from "../user.entity";

const userProps = {
  name: "Test User",
  email: "test@example.com",
  password: "password123",
  type: "admin" as "admin" | "vendor",
};

describe("User", () => {
  it("should initialize correctly", () => {
    const user = new User(userProps);
    expect(user.name).toBe("Test User");
    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("password123");
    expect(user.type).toBe("admin");
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.userId).toBeInstanceOf(Uuid);
  });

  it("should create a user correctly using static create method", () => {
    const user = User.create(userProps);
    expect(user.name).toBe("Test User");
    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("password123");
    expect(user.type).toBe("admin");
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.userId).toBeInstanceOf(Uuid);
  });

  it("should change name correctly", () => {
    const user = new User(userProps);
    user.changeName("New Name");
    expect(user.name).toBe("New Name");
  });

  it("should change email correctly", () => {
    const user = new User(userProps);
    user.changeEmail("new@example.com");
    expect(user.email).toBe("new@example.com");
  });

  it("should change password correctly", () => {
    const user = new User(userProps);
    user.changePassword("newpassword123");
    expect(user.password).toBe("newpassword123");
  });

  it("should validate user correctly", () => {
    const user = new User(userProps);
    expect(() => User.validate(user)).not.toThrow();
  });

  it("should throw validation error for invalid user", () => {
    const invalidUserProps = { ...userProps, email: "invalid-email" };
    const user = new User(invalidUserProps);
    expect(() => User.validate(user)).toThrow(EntityValidationError);
  });

  it("should return correct JSON representation", () => {
    const user = new User(userProps);
    const json = user.toJSON();
    expect(json).toEqual({
      useId: user.userId,
      name: "Test User",
      email: "test@example.com",
      type: "admin",
      createdAt: user.createdAt,
    });
  });
});
