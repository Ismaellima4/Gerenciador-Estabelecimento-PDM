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
      const hasCategory = state.list.find((category) => category.name.toLocaleLowerCase() === action.payload.name.toLocaleLowerCase())
      if(!hasCategory) {
        state.list.push(action.payload);
      }
    },
    setCategory: (state, action: PayloadAction<Category[]>) => {
      state.list = action.payload;
    },
    deleteCategory: (state, action: PayloadAction<string>)=> {
      state.list = state.list.filter(category => category.name !== action.payload)
    }
  },
});

export const { addCategory, setCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
