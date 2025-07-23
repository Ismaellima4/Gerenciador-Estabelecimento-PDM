import customer from "./customer";
import { PaymentType } from "./enum/payment-type.enum";
import { CreateOrder } from "./order";


type Payment = {
    id: string;
    orderId: string;
    amount: number;
    date: Date;
    customer?: customer;
    paymentType: PaymentType;
    paymentStatus: string;
}

export type CreatePayment = {
    order: CreateOrder;
    customerId?: string;
    paymentType: PaymentType;
}

export default Payment;