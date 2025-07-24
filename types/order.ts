
import  orderItem  from './order-item';
import  { OrderStatus }  from './enum/order-status.enum';
type order = {
    id: string;
    orderItems: orderItem[]; 
    orderStatus: OrderStatus;
    payment: string;
}

export interface CreateOrderItemDto {
  productID: string;
  quantity: number;
}

export interface CreateOrderDto {
  orderItems: CreateOrderItemDto[];
}

export default order;