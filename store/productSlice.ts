import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type Product from '@/types/product';
import { randomUUID } from 'expo-crypto';
import { RootState } from './store';

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
      const productWithId = {
        ...action.payload,
        id: randomUUID()
      }
      state.list.push(productWithId);
    },
    setProduct: (state, action: PayloadAction<Product[]>) => {
      state.list = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.list.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteProductById: (state, action: PayloadAction<{id: string}>) => {
      state.list = state.list.filter(
        (product) => product.id !== action.payload.id
      );
    },
    updateProductAmount: (state, action: PayloadAction<{ id: string; amount: number }[]>) => {
      action.payload.forEach(({ id, amount }) => {
        const index = state.list.findIndex((p) => p.id === id);
        if (index !== -1) {
          state.list[index].amount = amount;
        }
      });
    }

  },
});


export const findProductById = (state: RootState, id: string) => state.product.list.find((product) => product.id === id);
export const { addProduct, setProduct, updateProduct, deleteProductById, updateProductAmount } = productSlice.actions;
export default productSlice.reducer;
