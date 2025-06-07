import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="ProductsRegisterScreen" options={{headerTitle: "Cadastro de Produto"}} />
    </Stack>
  );
}
