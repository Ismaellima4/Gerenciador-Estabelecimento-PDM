import customer  from "./customer";
import { PaymentStatus } from "./enum/payment-status.enum";
import { PaymentType } from "./enum/payment-type.enum";
import order from "./order";


type payment = {
    id: string;
    order: order;
    amount: number;
    date: Date;
    custome?: customer;
    paymentType: PaymentType;
    paymentStatus: PaymentStatus;
}

export default payment;