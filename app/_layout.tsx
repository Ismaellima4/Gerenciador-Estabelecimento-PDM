import React from 'react';
import { Slot, Stack } from 'expo-router'; // Importe Stack também
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="productDetails" options={{headerTitle: "Detalhes do Produto"}} />
          <Stack.Screen name="suppliersDetails" options={{headerTitle: "Detalhes do Fornecedor"}} />
          <Stack.Screen name="supplierRegistration" options={{headerTitle: "Registrar Novo Produto"}}/>
        </Stack>
      </PersistGate>
    </Provider>
  );
}