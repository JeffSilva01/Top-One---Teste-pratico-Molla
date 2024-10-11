import { AggregateRoot } from "../../shared/domain/aggregate-root";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";

type OrderConstructorProps = {
  orderId?: Uuid;
  clientId: Uuid;
  products: Uuid[];
  createdAt?: Date;
};

type OrderCreateCommand = {
  clientId: Uuid;
  products: Uuid[];
};

export class OrderId extends Uuid {}

export class Order extends AggregateRoot {
  orderId: OrderId;
  clientId: Uuid;
  products: Uuid[];
  createdAt: Date;

  constructor(props: OrderConstructorProps) {
    super();
    this.orderId = props.orderId ?? new Uuid();
    this.clientId = props.clientId;
    this.products = props.products;
    this.createdAt = props.createdAt ?? new Date();
  }

  static create(props: OrderCreateCommand) {
    const order = new Order(props);
    return order;
  }

  get entityId() {
    return this.orderId;
  }

  toJSON() {
    return {};
  }
}
