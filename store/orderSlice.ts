import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { create, fetchAll, update, remove } from './genericThunk';
import Order from '@/types/order';
import { API_URL_ORDER } from './env';

interface OrderState {
  list: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchOrders = fetchAll<Order[]>('order/fetchOrders', API_URL_ORDER);


export const createOrder = create<Order, { orderItems: { productID: string; quantity: number }[]; orderStatus: string }>(
  'order/createOrder',
  API_URL_ORDER
);

export const updateOrder = update<Order, Order>('order/updateOrder', API_URL_ORDER);
export const deleteOrder = remove<string>('order/deleteOrder', API_URL_ORDER);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar pedidos';
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.list.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.list = state.list.filter((o) => o.id !== action.payload);
      });
  },
});

export const findOrderById = (state: RootState, id: string) =>
  state.order.list.find((order) => order.id === id);

export default orderSlice.reducer;
