import { createSlice } from '@reduxjs/toolkit';
import type Customer from '@/types/customer';
import { RootState } from './store';
import { API_URL_CUSTOMER } from './env';
import { create, fetchAll,remove, patch } from './genericThunk';
import { CreateCustomer, UpdateCustomerDto } from '@/types/customer';


interface CustomerState {
  list: Customer[];
  loading: boolean;
  error: string | null;
}


const initialState: CustomerState = {
  list: [],
  loading: false,
  error: null,
};


export const fetchCustomers = fetchAll<Customer[]>('customer/fetchCustomers', API_URL_CUSTOMER);
export const createCustomer = create<Customer, CreateCustomer>('customer/createCustomer', API_URL_CUSTOMER);
export const updateCustomer = patch<Customer, UpdateCustomerDto>('customer/updateCustomer', API_URL_CUSTOMER);
export const removeCustomer = remove<string>('customer/removeCustomer', API_URL_CUSTOMER);


const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCustomers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar clientes';
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.list.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeCustomer.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c.id !== action.payload);
      });
  },
});


export const findCustomerById = (state: RootState, id: string) =>
  state.customer.list.find(customer => customer.id === id);

export default customerSlice.reducer;
