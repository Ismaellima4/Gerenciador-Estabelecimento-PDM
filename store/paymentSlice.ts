import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { API_URL_PAYMENT } from './env';
import { create, fetchAll, update, remove} from './genericThunk';
import Payment, { CreatePayment } from '@/types/payment';

interface PaymentState {
  list: Payment[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchPayments = fetchAll<Payment[]>('payment/fetchPayments', API_URL_PAYMENT);
export const createPayment = create<Payment, CreatePayment>('payment/createPayment', API_URL_PAYMENT);
export const updatePayment = update<Payment, Payment>('payment/updatePayment', API_URL_PAYMENT);
export const deletePayment = remove('payment/deletePayment', API_URL_PAYMENT);

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
