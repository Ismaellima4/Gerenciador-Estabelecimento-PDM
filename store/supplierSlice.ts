import { createSlice } from '@reduxjs/toolkit';
import type Supplier from '@/types/supplier';
import { RootState } from './store';
import { API_URL_SUPPLIER } from './env';
import { create, fetchAll, patch, remove} from './genericThunk';
import { CreateSupplier, UpdateSupplierDto } from '@/types/supplier';

interface SupplierState {
  list: Supplier[];
  loading: boolean;
  error: string | null;
}

const initialState: SupplierState = {
  list: [],
  loading: false,
  error: null,
};


export const fetchSuppliers = fetchAll<Supplier[]>('supplier/fetchSuppliers', API_URL_SUPPLIER);
export const createSupplier = create<Supplier, CreateSupplier>('supplier/createSupplier', API_URL_SUPPLIER);
export const updateSupplier = patch<Supplier, UpdateSupplierDto>('supplier/updateSupplier', API_URL_SUPPLIER);
export const removeSupplier = remove<string>('supplier/removeSupplier', API_URL_SUPPLIER);

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {},
  extraReducers: builder => {
  builder
    .addCase(fetchSuppliers.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSuppliers.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    })
    .addCase(fetchSuppliers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Erro ao buscar fornecedores';
    })
    .addCase(createSupplier.fulfilled, (state, action) => {
      state.list.push(action.payload);
    })
    .addCase(updateSupplier.fulfilled, (state, action) => {
      const updatedSupplier = action.payload;
      const index = state.list.findIndex(s => s.id === updatedSupplier.id);
      if (index !== -1) {
        state.list[index] = updatedSupplier;
      } else {
        state.list.push(updatedSupplier);
      }
    })
    .addCase(removeSupplier.fulfilled, (state, action) => {
      state.list = state.list.filter(s => s.id !== action.payload);
    });
},

});

export const findSupplierById = (state: RootState, id: string) =>
  state.supplier.list.find(supplier => supplier.id === id);

export default supplierSlice.reducer;
