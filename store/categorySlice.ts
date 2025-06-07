import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type Category from '@/types/category';

interface CategoryState {
  list: Category[];
}

const initialState: CategoryState = {
  list: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.list.push(action.payload);
    },
    setCategory: (state, action: PayloadAction<Category[]>) => {
      state.list = action.payload;
    },
  },
});

export const { addCategory, setCategory } = categorySlice.actions;
export default categorySlice.reducer;
