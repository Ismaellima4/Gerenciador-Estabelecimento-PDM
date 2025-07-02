import { Stack } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="productDetails" options={{headerTitle: "Detalhes do Produto"}} />
          <Stack.Screen name="suppliersDetails" options={{headerTitle: "Detalhes do Fornecedor"}} />
          <Stack.Screen name="supplierRegister" options={{headerTitle: "Registrar Fornecedor"}}/>
          <Stack.Screen name="productsRegisterScreen" options={{headerTitle: "Registrar de Produto"}} />
          <Stack.Screen name="productUpdate" options={{headerTitle: "Atualizar Produto"}} />
          <Stack.Screen name="customerRegister" options={{headerTitle: "Registrar Cliente"}} />
          <Stack.Screen name="orderRegister" options={{headerTitle: "Pedido"}} />
          <Stack.Screen name="paymentRegister" options={{headerTitle: "Registrar Pagamento"}} />
          <Stack.Screen name="paymentDetails" options={{headerTitle: "Detalhes do Pagamento"}} />
          <Stack.Screen name="customersDetails" options={{headerTitle: "Detalhes do Cliente"}} />
          <Stack.Screen name="orderDetails" options={{headerTitle: "Detalhes do Pedido"}} />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
