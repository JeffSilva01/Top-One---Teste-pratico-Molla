import { EntityValidationError } from "../../../shared/domain/validators/validation.error";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Client } from "../client.entity";

const clientProps = {
  name: "Test Client",
  email: "test@example.com",
  phone: "1234567890",
  age: 28,
  address: "rua algusta, 123 - São Paulo",
};

describe("Client", () => {
  it("should initialize correctly", () => {
    const client = new Client(clientProps);
    expect(client.name).toBe("Test Client");
    expect(client.email).toBe("test@example.com");
    expect(client.phone).toBe("1234567890");
    expect(client.createdAt).toBeInstanceOf(Date);
    expect(client.clientId).toBeInstanceOf(Uuid);
  });

  it("should create a client correctly using static create method", () => {
    const client = Client.create(clientProps);
    expect(client.name).toBe("Test Client");
    expect(client.email).toBe("test@example.com");
    expect(client.phone).toBe("1234567890");
    expect(client.createdAt).toBeInstanceOf(Date);
    expect(client.clientId).toBeInstanceOf(Uuid);
  });

  it("should validate client correctly", () => {
    const client = new Client(clientProps);
    expect(() => Client.validate(client)).not.toThrow();
  });

  it("should throw validation error for invalid client", () => {
    const invalidClientProps = { ...clientProps, email: "invalid-email" };
    const client = new Client(invalidClientProps);
    expect(() => Client.validate(client)).toThrow(EntityValidationError);
  });

  it("should change name correctly", () => {
    const client = new Client(clientProps);
    client.changeName("New Name");
    expect(client.name).toBe("New Name");
  });

  it("should change email correctly", () => {
    const client = new Client(clientProps);
    client.changeEmail("new@example.com");
    expect(client.email).toBe("new@example.com");
  });

  it("should change phone correctly", () => {
    const client = new Client(clientProps);
    client.changePhone("0987654321");
    expect(client.phone).toBe("0987654321");
  });

  it("should return correct JSON representation", () => {
    const client = new Client(clientProps);
    const json = client.toJSON();
    expect(json).toEqual({
      clientId: client.clientId,
      name: "Test Client",
      email: "test@example.com",
      phone: "1234567890",
      age: 28,
      address: "rua algusta, 123 - São Paulo",
      createdAt: client.createdAt,
    });
  });
});
