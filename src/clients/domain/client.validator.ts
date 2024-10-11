import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from "class-validator";
import { Client } from "./client.entity";
import { ClassValidatorFields } from "../../shared/domain/validators/class-validator-fields";

export class ClientRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  age: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  constructor({ name, email, phone, age, address }: Client) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.age = age;
    this.address = address;
  }
}

export class ClientValidator extends ClassValidatorFields<ClientRules> {
  validate(entity: Client) {
    return super.validate(new ClientRules(entity));
  }
}

export class ClientValidatorFactory {
  static create() {
    return new ClientValidator();
  }
}
