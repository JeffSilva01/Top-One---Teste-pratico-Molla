import { Entity } from "../../shared/domain/entity";
import { EntityValidationError } from "../../shared/domain/validators/validation.error";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { ProductValidatorFactory } from "./product.validator";

export type ProductConstructorProps = {
  productId?: Uuid;
  name: string;
  description: string;
  price: number;
  createdAt?: Date;
};

export type ProductCreateComand = {
  name: string;
  description: string;
  price: number;
};

export class Product extends Entity {
  productId: Uuid;
  name: string;
  description: string;
  price: number;
  createdAt: Date;

  constructor(props: ProductConstructorProps) {
    super();
    this.productId = props.productId ?? new Uuid();
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.createdAt = props.createdAt ?? new Date();
  }

  changeName(name: string) {
    this.name = name;
    Product.validate(this);
  }

  changeDescription(description: string) {
    this.description = description;
    Product.validate(this);
  }

  changePrice(price: number) {
    this.price = price;
    Product.validate(this);
  }

  static create(props: ProductCreateComand) {
    const product = new Product(props);
    Product.validate(product);
    return product;
  }

  static validate(entity: Product) {
    const validator = ProductValidatorFactory.create();
    const isValid = validator.validate(entity);

    if (!isValid) {
      throw new EntityValidationError(validator.errors!);
    }
  }

  get entityId() {
    return this.productId;
  }

  toJSON() {
    return {
      productId: this.productId,
      name: this.name,
      description: this.description,
      price: this.price,
      createdAt: this.createdAt,
    };
  }
}
