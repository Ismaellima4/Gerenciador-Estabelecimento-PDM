import Product from "./product";

type orderItem = {
    id: string;
    product:  Product;
    quantity: number;
}

export type CreateOrderItem = {
    productID: string;
    quantity: number;
}

export default orderItem;