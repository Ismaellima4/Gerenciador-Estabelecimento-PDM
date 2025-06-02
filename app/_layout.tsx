import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
  <Tabs>
    <Tabs.Screen name="ProductsScreen" options={{ title: 'Produtos' }} />
  </Tabs>
);
}
