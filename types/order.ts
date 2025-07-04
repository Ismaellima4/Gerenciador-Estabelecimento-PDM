
import  payment  from './payment';
import  orderItem  from './order-item';
import  {OrderStatus}  from './enum/order-status.enum';
type order = {
    id: string;
    orderItems: orderItem[];
    orderStatus: OrderStatus;
    payment: payment;
}

export default order;