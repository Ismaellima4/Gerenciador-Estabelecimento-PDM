import { HasId } from "@/store/genericThunk";
import Category from "./category";
import Supplier from "./supplier";
import { ImagePickerAsset } from 'expo-image-picker';

type Product = {
    id: string;
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


export interface UpdateProduct extends Partial<CreateProduct> , HasId {}

export interface CreateProduct {
    productName: string;
    description?: string;
    price: number;
    category: string;
    amount: number;
    expirationDate: string;
    barCode: string;
    manufacturingDate: string;
    supplier: string;
    file?: ImagePickerAsset,
}


export default Product;
