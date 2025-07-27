import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="homeScreen"
        options={{
          title: 'Produtos',
          tabBarIcon: () => <FontAwesome name="shopping-basket" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="listSuppliers"
        options={{
          title: 'Fornecedores',
          tabBarIcon: () => <FontAwesome name="handshake-o" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="listCustomers"
        options={{
          title: 'Clientes',
          tabBarIcon: () => <FontAwesome name="users" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="listPayments"
        options={{
          title: 'Pagamentos',
          tabBarIcon: () => <FontAwesome name="money" size={24} color="black" />,
        }}
      />

      <Tabs.Screen
        name="listOrder"
        options={{
          title: 'Pedidos',
          tabBarIcon: () => <AntDesign name="shoppingcart" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
