import { configureStore, combineReducers } from '@reduxjs/toolkit';
import supplierReducer from './supplierSlice';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import paymentReducer from './paymentSlice';
import orderReducer from './orderSlice';
import customerReducer from './customerSlice';
import orderItemReducer from './orderItemSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  supplier: supplierReducer,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer,
  payment: paymentReducer,
  customer: customerReducer,
  orderItem: orderItemReducer

});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
