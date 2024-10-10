import { Product } from "../../../product/domain/product.entity";
import { EntityValidationError } from "../../../shared/domain/validators/validation.error";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";

const productProps = {
  name: "Test Product",
  description: "Test Description",
  price: 1000,
};

describe("Product", () => {
  it("should initialize correctly", () => {
    const product = new Product(productProps);
    expect(product.name).toBe("Test Product");
    expect(product.description).toBe("Test Description");
    expect(product.price).toBe(1000);
    expect(product.createdAt).toBeInstanceOf(Date);
    expect(product.productId).toBeInstanceOf(Uuid);
  });

  it("should create a product correctly using static create method", () => {
    const product = Product.create(productProps);
    expect(product.name).toBe("Test Product");
    expect(product.description).toBe("Test Description");
    expect(product.price).toBe(1000);
    expect(product.createdAt).toBeInstanceOf(Date);
    expect(product.productId).toBeInstanceOf(Uuid);
  });

  it("should validate product correctly", () => {
    const product = new Product(productProps);
    expect(() => Product.validate(product)).not.toThrow();
  });

  it("should throw validation error for invalid product", () => {
    const invalidProductProps = { ...productProps, price: -100 };
    const product = new Product(invalidProductProps);
    expect(() => Product.validate(product)).toThrow(EntityValidationError);
  });

  it("should return correct JSON representation", () => {
    const product = new Product(productProps);
    const json = product.toJSON();
    expect(json).toEqual({
      productId: product.productId,
      name: "Test Product",
      description: "Test Description",
      price: 1000,
      createdAt: product.createdAt,
    });
  });
});
