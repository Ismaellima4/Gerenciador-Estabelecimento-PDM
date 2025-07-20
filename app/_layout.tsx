import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="productDetails" options={{ headerTitle: "Detalhes do Produto" }} />
        <Stack.Screen name="suppliers/suppliersDetails" options={{ headerTitle: "Detalhes do Fornecedor" }} />
        <Stack.Screen name="suppliers/supplierRegister" options={{ headerTitle: "Registrar Fornecedor" }} />
        <Stack.Screen name="productsRegisterScreen" options={{ headerTitle: "Registrar de Produto" }} />
        <Stack.Screen name="productUpdate" options={{ headerTitle: "Atualizar Produto" }} />
        <Stack.Screen name="customerRegister" options={{ headerTitle: "Registrar Cliente" }} />
        <Stack.Screen name="orderRegister" options={{ headerTitle: "Pedido" }} />
        <Stack.Screen name="paymentRegister" options={{ headerTitle: "Registrar Pagamento" }} />
        <Stack.Screen name="paymentDetails" options={{ headerTitle: "Detalhes do Pagamento" }} />
        <Stack.Screen name="customersDetails" options={{ headerTitle: "Detalhes do Cliente" }} />
        <Stack.Screen name="orderDetails" options={{ headerTitle: "Detalhes do Pedido" }} />
      </Stack>
    </Provider>
  );
}
