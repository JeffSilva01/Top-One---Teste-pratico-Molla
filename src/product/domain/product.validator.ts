import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { Product } from "./product.entity";
import { ClassValidatorFields } from "../../shared/domain/validators/class-validator-fields";

export class ProductRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  constructor({ name, description, price }: Product) {
    this.name = name;
    this.description = description;
    this.price = price;
  }
}

export class ProductValidator extends ClassValidatorFields<ProductRules> {
  validate(entity: Product) {
    return super.validate(new ProductRules(entity));
  }
}

export class ProductValidatorFactory {
  static create() {
    return new ProductValidator();
  }
}
