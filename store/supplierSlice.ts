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
    deleteSupplier: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(supplier => supplier.cnpj !== action.payload);
    },
    updateSupplier: (state, action: PayloadAction<{ oldCnpj: string; supplier: Supplier }>) => {
      const { oldCnpj, supplier } = action.payload;
      const index = state.list.findIndex(s => s.cnpj === oldCnpj);
      if (index !== -1) {
        state.list[index] = supplier;
      }
    },

  },
});

export const { addSupplier, setSuppliers, deleteSupplier,updateSupplier} = supplierSlice.actions;
export default supplierSlice.reducer;
