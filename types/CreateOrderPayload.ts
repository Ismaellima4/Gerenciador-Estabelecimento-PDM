import { OrderStatus } from "./enum/order-status.enum";

type CreateOrderPayload = {
  orderItems: {
    productID: string;
    quantity: number;
  }[];
  orderStatus: OrderStatus;
};

export default CreateOrderPayload;