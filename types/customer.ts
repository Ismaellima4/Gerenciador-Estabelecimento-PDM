import type  payment  from "./payment";

type customer = {
    id: string;   
    name: string;
    cpf: string;
    email: string;
    phone: string;
    payments: payment[];
}
export default customer;