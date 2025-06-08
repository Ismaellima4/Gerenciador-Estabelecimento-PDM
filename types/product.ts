import Category from "./category";
import Supplier from "./supplier";

type Product = {
    productName: string;
    description?: string;
    productImage?: string;
    price: number;
    category: Category;
    amount: number;
    expirationDate: Date;
    barCode: string;
    manufacturingDate: Date;
    supplier: Supplier;
}

export default Product;
