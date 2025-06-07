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
  },
});

export const { addProduct, setProduct } = productSlice.actions;
export default productSlice.reducer;
