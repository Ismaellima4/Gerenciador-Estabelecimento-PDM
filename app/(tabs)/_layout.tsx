import { RootState } from '@/store/store';
import { UserRole } from '@/types/enum/roles.enum';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';

export default function TabLayout() {
  const user = useSelector((state: RootState) => state.auth.user);

  const hasRole = (role: UserRole) => user?.role === role;

  const isAdmin = hasRole(UserRole.Admin);
  const isAdminStock = hasRole(UserRole.Admin_Stock);
  const isAdminCashier = hasRole(UserRole.Admin_cashier);

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="homeScreen"
        options={{
          title: 'Produtos',
          tabBarIcon: () => <FontAwesome name="shopping-basket" size={24} color="black" />,
          href: (isAdmin || isAdminStock) ? 'homeScreen' : null,
        }}
      />
      <Tabs.Screen
        name="listSuppliers"
        options={{
          title: 'Fornecedores',
          tabBarIcon: () => <FontAwesome name="handshake-o" size={24} color="black" />,
          href: (isAdmin || isAdminStock) ? 'listSuppliers' : null,
        }}
      />

      <Tabs.Screen
        name="listCustomers"
        options={{
          title: 'Clientes',
          tabBarIcon: () => <FontAwesome name="users" size={24} color="black" />,
          href: (isAdmin || isAdminCashier) ? 'listCustomers' : null,
        }}
      />
      <Tabs.Screen
        name="listPayments"
        options={{
          title: 'Pagamentos',
          tabBarIcon: () => <FontAwesome name="money" size={24} color="black" />,
          href: (isAdmin || isAdminCashier) ? 'listPayments' : null,
        }}
      />
      <Tabs.Screen
        name="listOrder"
        options={{
          title: 'Pedidos',
          tabBarIcon: () => <AntDesign name="shoppingcart" size={24} color="black" />,
          href: (isAdmin || isAdminCashier) ? 'listOrder' : null,
        }}
      />
    </Tabs>
  );
}