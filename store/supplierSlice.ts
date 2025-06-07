import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type Supplier from '@/types/supplier';

interface SupplierState {
  list: Supplier[];
}

const initialState: SupplierState = {
  list: [],
};

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    addSupplier: (state, action: PayloadAction<Supplier>) => {
      state.list.push(action.payload);
    },
    setSuppliers: (state, action: PayloadAction<Supplier[]>) => {
      state.list = action.payload;
    },
  },
});

export const { addSupplier, setSuppliers } = supplierSlice.actions;
export default supplierSlice.reducer;
