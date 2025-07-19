import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import payment from '@/types/payment';
import { API_URL_PAYMENT } from './env';
import { create, fetchAll, update, remove } from './genericThunk';

interface PaymentState {
  list: payment[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchPayments = fetchAll<payment[]>('payment/fetchPayments', API_URL_PAYMENT);
export const createPayment = create<payment, Omit<payment, 'id'>>('payment/createPayment', API_URL_PAYMENT);
export const updatePayment = update<payment, payment>('payment/updatePayment', API_URL_PAYMENT);
export const deletePayment = remove<string>('payment/deletePayment', API_URL_PAYMENT);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar pagamentos';
      })

      .addCase(createPayment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(updatePayment.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(deletePayment.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.id !== action.payload);
      });
  },
});


export const findPaymentById = (state: RootState, id: string) =>
  state.payment.list.find((p) => p.id === id);

export default paymentSlice.reducer;
