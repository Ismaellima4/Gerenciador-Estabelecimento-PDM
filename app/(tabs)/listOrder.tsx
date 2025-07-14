import { AddButton } from '@/components/AddButton';
import { Search } from '@/components/Search';
import { listStyles } from '@/styles/listStyles';
import { Link } from 'expo-router';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function ListOrders() {


  const orders = useSelector((state: RootState) => state.order.list);
  const payments = useSelector((state: RootState) => state.payment.list);

  return (
    <SafeAreaView style={listStyles.container}>
      <View style={listStyles.header}>
        <Text style={listStyles.title}>Pedidos</Text>
        <AddButton pathname="orderItemForm" />
      </View>

      <Search />

      <FlatList
        data={orders}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => {
          const payment = payments.find((p) => p.order.id === item.id);

          return (
            <Link
              href={{
                pathname: '/orderDetails',
                params: { id: item.id },
              }}
              asChild
            >
              <TouchableOpacity>
                <View style={listStyles.card}>
                  <Text style={listStyles.cardTitle}>Pedido #{item.id.slice(0, 8)}</Text>
                  <Text style={listStyles.cardInfo}>Status: {item.orderStatus}</Text>
                  <Text style={listStyles.cardInfo}>
                    Total: R$ {item.orderItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0).toFixed(2)}
                  </Text>
                  <Text style={listStyles.cardInfo}>
                    Pagamento: {payment ? payment.paymentType: ''}
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          );
        }}
        ListEmptyComponent={
          <Text style={listStyles.emptyText}>Nenhum pedido cadastrado.</Text>
        }
      />
    </SafeAreaView>
  );
}
