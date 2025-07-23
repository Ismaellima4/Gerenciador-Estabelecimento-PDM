
import  orderItem, { CreateOrderItem }  from './order-item';
import  { OrderStatus }  from './enum/order-status.enum';
type order = {
    id: string;
    orderItems: orderItem[]; 
    orderStatus: OrderStatus;
    payment: string;
}

export type CreateOrder = {
    orderItems: CreateOrderItem[];
}

export default order;