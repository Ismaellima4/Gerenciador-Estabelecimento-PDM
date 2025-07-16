import { configureStore, combineReducers } from '@reduxjs/toolkit';
import supplierReducer from './supplierSlice';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import paymentReducer from './paymentSlice';
import orderReducer from './orderSlice';
import customerReducer from './customerSlice';
import orderItemReducer from './orderItemSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  supplier: supplierReducer,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer,
  payment: paymentReducer,
  customer: customerReducer,
  orderItem: orderItemReducer,
  auth: authReducer, 
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
