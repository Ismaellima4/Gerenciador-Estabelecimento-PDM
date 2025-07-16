import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type Supplier from '@/types/supplier';
import { RootState } from './store';
import axios from 'axios';

const API_URL = 'http://:3000/suppliers';

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


const getAuthHeaders = (state: RootState) => {
  const token = state.auth.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchSuppliers = createAsyncThunk(
  'supplier/fetchSuppliers',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axios.get(API_URL, getAuthHeaders(state));
    return response.data as Supplier[];
  }
);

export const createSupplier = createAsyncThunk(
  'supplier/createSupplier',
  async (newSupplier: Omit<Supplier, 'id'>, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axios.post(API_URL, newSupplier, getAuthHeaders(state));
    return response.data as Supplier;
  }
);

export const deleteSupplier = createAsyncThunk(
  'supplier/deleteSupplier',
  async (id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    await axios.delete(`${API_URL}/${id}`, getAuthHeaders(state));
    return id;
  }
);

export const updateSupplier = createAsyncThunk(
  'supplier/updateSupplier',
  async (supplier: Supplier, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axios.patch(`${API_URL}/${supplier.id}`, supplier, getAuthHeaders(state));
    return response.data as Supplier;
  }
);

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
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.list = state.list.filter(s => s.id !== action.payload);
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        const index = state.list.findIndex(s => s.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      });
  },
});

export const findSupplierById = (state: RootState, id: string) =>
  state.supplier.list.find(supplier => supplier.id === id);

export default supplierSlice.reducer;
