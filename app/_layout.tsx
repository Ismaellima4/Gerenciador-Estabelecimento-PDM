import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="products/productDetails" options={{ headerTitle: "Detalhes do Produto" }} />
        <Stack.Screen name="suppliers/suppliersDetails" options={{ headerTitle: "Detalhes do Fornecedor" }} />
        <Stack.Screen name="suppliers/supplierRegister" options={{ headerTitle: "Registrar Fornecedor" }} />
        <Stack.Screen name="products/productsRegisterScreen" options={{ headerTitle: "Registrar Produto" }} />
        <Stack.Screen name="products/productUpdate" options={{ headerTitle: "Atualizar Produto" }} />
        <Stack.Screen name="customers/customerRegister" options={{ headerTitle: "Registrar Cliente" }} />
        <Stack.Screen name="orders/orderRegister" options={{ headerTitle: "Pedido" }} />
        <Stack.Screen name="payments/paymentRegister" options={{ headerTitle: "Registrar Pagamento" }} />
        <Stack.Screen name="payments/paymentDetails" options={{ headerTitle: "Detalhes do Pagamento" }} />
        <Stack.Screen name="customers/customersDetails" options={{ headerTitle: "Detalhes do Cliente" }} />
        <Stack.Screen name="orders/orderDetails" options={{ headerTitle: "Detalhes do Pedido" }} />
         <Stack.Screen name="createUserScreen" options={{ headerTitle: "Registrar Usuário" }} />
      </Stack>
    </Provider>
  );
}
