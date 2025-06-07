import Category from "./category";
import Supplier from "./supplier";

type Product = {
    name: string;
    description?: string;
    image?: string;
    price: number;
    category: Category;
    amount: number;
    expirationDate: Date;
    barCode: string;
    manufacturingDate: Date;
    supplier: Supplier;
}

export default Product;
