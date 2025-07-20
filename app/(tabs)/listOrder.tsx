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
import { fetchProducts } from '@/store/productSlice';

export default function ListOrders() {
  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector((state: RootState) => state.order.list);
  const payments = useSelector((state: RootState) => state.payment.list);
  const products = useSelector((state: RootState) => state.product.list);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts())
  }, [dispatch]);

  return (
    <SafeAreaView style={listStyles.container}>
      <View style={listStyles.header}>
        <Text style={listStyles.title}>Pedidos</Text>
        <AddButton pathname="orderRegister" />
      </View>

      <Search />

      <FlatList
        data={orders}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => {
          const payment = payments.find((p) => p.order?.id === item.id);

          const total = item.orderItems.reduce((sum, i) => {
            const product = products.find((p) => p.id === i.productId);
            const price = product?.price ?? 0;
            return sum + price * i.quantity;
          }, 0);

          return (
            <Link

              href={{ pathname: '/orderDetails', params: { id: item.id } }}

              asChild
            >
              <TouchableOpacity>
                <View style={listStyles.card}>
                  <Text style={listStyles.cardTitle}>
                    Pedido #{item.id.slice(0, 8)}
                  </Text>
                  <Text style={listStyles.cardInfo}>Status: {item.orderStatus}</Text>
                  <Text style={listStyles.cardInfo}>
                    Total: R$ {total.toFixed(2)}
                  </Text>
                  <Text style={listStyles.cardInfo}>
                    Pagamento: {payment ? payment.paymentType : '—'}
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
