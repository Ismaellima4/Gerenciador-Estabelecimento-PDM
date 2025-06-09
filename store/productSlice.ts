import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type Product from '@/types/product';

interface ProductState {
  list: Product[];
}

const initialState: ProductState = {
  list: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.list.push(action.payload);
    },
    setProduct: (state, action: PayloadAction<Product[]>) => {
      state.list = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.list.findIndex(
        (product) => product.barCode === action.payload.barCode // Assumindo barCode como um ID único
      );
      if (index !== -1) {
        state.list[index] = action.payload; // Substitui o produto existente pelo atualizado
      }
    },
    deleteProduct: (state, action: PayloadAction<Product>) => {
      const {
        productName,
        supplier: { cnpj },
      } = action.payload;

      state.list = state.list.filter(
        (product) =>
          !(
            product.productName === productName &&
            product.supplier.cnpj === cnpj
          )
      );
    },
  },
});

export const { addProduct, setProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
