import { Entity } from "../../shared/domain/entity";
import { EntityValidationError } from "../../shared/domain/validators/validation.error";
import { ValueObject } from "../../shared/domain/value-object";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { UserValidatorFactory } from "./user.validator";

export type UserConstructorProps = {
  userId?: Uuid;
  name: string;
  email: string;
  password: string;
  type: "admin" | "vendor";
  createdAt?: Date;
};

export type UserCreateComand = {
  name: string;
  email: string;
  password: string;
  type: "admin" | "vendor";
};

export class User extends Entity {
  userId: Uuid;
  name: string;
  email: string;
  password: string;
  type: "admin" | "vendor";
  createdAt: Date;

  constructor(props: UserConstructorProps) {
    super();
    this.userId = props.userId ?? new Uuid();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.type = props.type;
    this.createdAt = props.createdAt ?? new Date();
  }

  get entityId(): ValueObject {
    return this.userId;
  }

  static create(props: UserCreateComand) {
    const user = new User(props);
    User.validate(user);
    return user;
  }

  changeName(name: string) {
    this.name = name;
    User.validate(this);
  }

  changeEmail(email: string) {
    this.email = email;
    User.validate(this);
  }

  changePassword(password: string) {
    this.password = password;
    User.validate(this);
  }

  static validate(entity: User) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(entity);

    if (!isValid) {
      throw new EntityValidationError(validator.errors!);
    }
  }

  toJSON() {
    return {
      useId: this.userId,
      name: this.name,
      email: this.email,
      type: this.type,
      createdAt: this.createdAt,
    };
  }
}
