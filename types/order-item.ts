import Product from "./product";

type orderItem = {
    id: string;
    product:  Product;
    quantity: number;
}

export default orderItem;