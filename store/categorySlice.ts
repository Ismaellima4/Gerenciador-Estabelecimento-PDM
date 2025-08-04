import type Category from '@/types/category';
import { createSlice } from '@reduxjs/toolkit';
import { API_URL_CATEGORY } from './env';
import { create, fetchAll, remove } from './genericThunk';

interface CategoryState {
  list: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  list: [],
  loading: false,
  error: null,
};

export const createCategory = create<Category, Omit<Category, 'id'>>('category/createCategory', API_URL_CATEGORY);
export const fetchAllCategories = fetchAll<Category[]>('fetch/category', API_URL_CATEGORY);
export const deleteCategory = remove('delete/category', API_URL_CATEGORY);

const  categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
      builder
        .addCase(fetchAllCategories.pending, state => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAllCategories.fulfilled, (state, action) => {
          state.list = action.payload;
          state.loading = false;
        })
        .addCase(fetchAllCategories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Erro ao buscar fornecedores';
        })
        .addCase(createCategory.fulfilled, (state, action) => {
            state.list.push(action.payload);
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.list = state.list.filter(s => s.id !== action.payload);
        })
    },
});

export default categorySlice.reducer;
