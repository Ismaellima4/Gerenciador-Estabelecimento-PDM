import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type Supplier from '@/types/supplier';
import { randomUUID } from 'expo-crypto';
import { RootState } from './store';

interface SupplierState {
  list: Supplier[];
}

const initialState: SupplierState = {
  list: [],
};

type NewSupplier = Omit<Supplier, 'id'>;

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    addSupplier: (state, action: PayloadAction<NewSupplier>) => {
      const supplierWithId: Supplier = {
        ...action.payload,
          id: randomUUID()
        };
      state.list.push(supplierWithId);
    },
    setSuppliers: (state, action: PayloadAction<Supplier[]>) => {
      state.list = action.payload;
    },
    deleteSupplierById: (state, action: PayloadAction<{id: string}>) => {
      state.list = state.list.filter(supplier => supplier.id !== action.payload.id);
    },
    updateSupplier: (state, action: PayloadAction<Supplier>) => {
      const index = state.list.findIndex((supplier) => supplier.id === action.payload.id);

      if (index !== -1) {
        state.list[index] = action.payload;
      }     
    },
  },
});

export const findSupplierById = (state: RootState, id: string) => state.supplier.list.find((supplier) => supplier.id === id);
export const { addSupplier, setSuppliers, deleteSupplierById,updateSupplier} = supplierSlice.actions;
export default supplierSlice.reducer;
