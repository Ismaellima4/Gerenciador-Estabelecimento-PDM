type Product = {
    name: string;
    description?: string;
    image?: string;
    price: number;
    category: string;
    amount: number;
    expirationDate: Date;
    barCode: string;
}

export default Product;