import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return ( 
   <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="productDetails" options={{headerTitle: "Detalhes do Produto"}} />
      <Stack.Screen name="suppliersDetails" options={{headerTitle: "Detalhes do Fornecedor"}} />
    </Stack>
  );
}
