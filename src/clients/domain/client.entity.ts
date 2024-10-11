import { Entity } from "../../shared/domain/entity";
import { EntityValidationError } from "../../shared/domain/validators/validation.error";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { ClientValidatorFactory } from "./client.validator";

export type ClientConstructorProps = {
  clientId?: Uuid;
  name: string;
  email: string;
  phone: string;
  age: number;
  address: string;
  createdAt?: Date;
};

export type ClientCreateMetode = {
  name: string;
  email: string;
  phone: string;
  age: number;
  address: string;
};

export class Client extends Entity {
  clientId: Uuid;
  name: string;
  email: string;
  phone: string;
  age: number;
  address: string;
  createdAt: Date;

  constructor(props: ClientConstructorProps) {
    super();
    this.clientId = props.clientId ?? new Uuid();
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.age = props.age;
    this.address = props.address;
    this.createdAt = props.createdAt ?? new Date();
  }

  static create(props: ClientCreateMetode) {
    const client = new Client(props);
    Client.validate(client);
    return client;
  }

  changeName(name: string) {
    this.name = name;
    Client.validate(this);
  }

  changeEmail(email: string) {
    this.email = email;
    Client.validate(this);
  }

  changePhone(phone: string) {
    this.phone = phone;
    Client.validate(this);
  }

  changeAddress(address: string) {
    this.address = address;
    Client.validate(this);
  }

  changeAge(age: number) {
    this.age = age;
    Client.validate(this);
  }

  get entityId() {
    return this.clientId;
  }

  static validate(entity: Client) {
    const validator = ClientValidatorFactory.create();
    const isValid = validator.validate(entity);

    if (!isValid) {
      throw new EntityValidationError(validator.errors!);
    }
  }

  toJSON() {
    return {
      clientId: this.clientId,
      name: this.name,
      email: this.email,
      phone: this.phone,
      age: this.age,
      address: this.address,
      createdAt: this.createdAt,
    };
  }
}
