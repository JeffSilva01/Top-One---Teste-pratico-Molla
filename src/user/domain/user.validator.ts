import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { User } from "./user.entity";
import { ClassValidatorFields } from "../../shared/domain/validators/class-validator-fields";

export class UserRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum({ admin: "admin", vendor: "vendor" })
  @IsNotEmpty()
  type: "admin" | "vendor";

  constructor({ name, email, password, type }: User) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(entity: User) {
    return super.validate(new UserRules(entity));
  }
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}
