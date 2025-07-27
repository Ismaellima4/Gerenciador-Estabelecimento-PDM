import { createSlice } from '@reduxjs/toolkit';
import type Product from '@/types/product';
import { RootState } from './store';
import {API_URL_PRODUCT } from './env';
import { createWithFormData, fetchAll, remove, update } from './genericThunk';
import { UpdateProduct } from '@/types/product';

interface ProductState {
  list: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchProducts = fetchAll<Product[]>('product/fetchProducts', API_URL_PRODUCT);
export const createProduct = createWithFormData<Product>('product/createProduct', API_URL_PRODUCT);
export const updateProduct = update<Product, UpdateProduct>('product/updateProduct', API_URL_PRODUCT);
export const deleteProduct = remove<string>('product/deleteProduct', API_URL_PRODUCT);


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProductAmount: (state, action) => {
      action.payload.forEach(({ id, amount }: { id: string; amount: number }) => {
        const index = state.list.findIndex((p) => p.id === id);
        if (index !== -1) {
          state.list[index].amount = amount;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar produtos';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.id !== action.payload);
      });
  },
});


export const findProductById = (state: RootState, id: string) =>
  state.product.list.find(product => product.id === id);

export const { updateProductAmount } = productSlice.actions;

export default productSlice.reducer;
