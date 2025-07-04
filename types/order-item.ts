import Product from "./product";
import  order  from "./order";

type orderItem = {
    id: string;
    product: Product;
    quantity: number;
    order: order;

}

export default orderItem;