import { AddButton } from '@/components/AddButton';
import { Search } from '@/components/Search';
import { listStyles } from '@/styles/listStyles';
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchOrders } from '@/store/orderSlice';
import { OrderStatusTranslations } from '@/types/enum/order-status.enum';

export default function ListOrders() {
  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector((state: RootState) => state.order.list);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <SafeAreaView style={listStyles.container}>
      <View style={listStyles.header}>
        <Text style={listStyles.title}>Pedidos</Text>
        <AddButton pathname="orders/orderRegister" />
      </View>

      <Search items={orders} searchBy='id' getDetailsPath={() => 'orders/orderDetails'}/>

      <FlatList
        data={orders}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => {
          const total = item.orderItems.reduce((sum, i) => {
            return sum + i.product.price * i.quantity;
          }, 0);

          return (
            <Link

              href={{ pathname: 'orders/orderDetails', params: { id: item.id } }}

              asChild
            >
              <TouchableOpacity>
                <View style={listStyles.card}>
                  <Text style={listStyles.cardTitle}>
                    Pedido #{item.id.slice(0, 8)}
                  </Text>
                  <Text style={listStyles.cardInfo}>Status: { OrderStatusTranslations[item.orderStatus]}</Text>
                  <Text style={listStyles.cardInfo}>
                    Total: R$ {total.toFixed(2)}
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
