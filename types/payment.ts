import { PaymentType } from "./enum/payment-type.enum";


type Payment = {
    id: string;
    orderId: string;
    amount: number;
    date: Date;
    customerId?: string ;
    paymentType: PaymentType;
    statusPayment: string;
}

export type CreatePayment = {
    orderId: string;
    customerId?: string;
    paymentType: PaymentType;
}

export default Payment;