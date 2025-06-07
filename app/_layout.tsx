import { Stack } from "expo-router";

export default function RootLayout() {
  return ( 
    <Stack>
        <Stack.Screen name="supplierRegistration" options={{headerTitle: "Registrar Novo Produto"}}/>
    </Stack>
  );
}
