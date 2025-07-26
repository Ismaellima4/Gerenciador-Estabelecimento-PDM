
import { fetchCustomers, findCustomerById } from '@/store/customerSlice';
import { setOrderItems } from '@/store/orderItemSlice';
import { deleteOrder, fetchOrders, findOrderById } from '@/store/orderSlice';
import { fetchPayments, findPaymentById } from '@/store/paymentSlice';
import { AppDispatch, RootState } from '@/store/store';
import { OrderStatus } from '@/types/enum/order-status.enum';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function OrderDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [modalVisible, setModalVisible] = useState(false);

   useEffect(() => {
      if (id) {
        dispatch(fetchOrders());
        dispatch(fetchPayments());
        dispatch(fetchCustomers());
      }
    }, [dispatch, id]);
  
  const order = useSelector((state: RootState) => findOrderById(state, id));

  
  const payment = useSelector((state: RootState) => {
    if (!order?.paymentId) return undefined;
    return findPaymentById(state, order.paymentId);
  });

 
  const customer = useSelector((state: RootState) => {
    if (!payment?.customerId) return undefined;
    return findCustomerById(state, payment.customerId);
  });

  const orderValue = order
    ? order.orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)
    : '0.00';

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centeredMessage}>
          <Text style={styles.errorMessage}>Pedido não encontrado.</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Voltar para a lista</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  
  const handleDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir o pedido?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await dispatch(deleteOrder(order.id)).unwrap();
              Alert.alert('Removido', 'Pedido excluído com sucesso!');
              router.back();
            } catch (error: any) {
              Alert.alert('Erro', error.message || 'Erro ao excluir pedido');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <TextInput
          style={styles.input}
          value={`R$ ${orderValue}`}
          
          editable={false}
          placeholder="Valor do Pedido"
        />

        <TextInput
          style={styles.input}
          value={order.orderStatus}
          editable={false}
          placeholder="Status do pedido"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          value={payment?.statusPayment}
          editable={false}
          placeholder="Status do pagamento"
        />

        <TextInput
          style={styles.input}
          value={customer?.name}
          editable={false}
          placeholder="Cliente (não obrigatório)"
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          value={payment?.paymentType}
          editable={false}
          placeholder="Tipo do pagamento"
        />

        <TouchableOpacity style={styles.itemsButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.itemsButtonText}>Ver Itens do Pedido</Text>
        </TouchableOpacity>

        {order.orderStatus === OrderStatus.INITIATED && (
          <TouchableOpacity
            style={[styles.itemsButton, { backgroundColor: 'green' }]}
            onPress={() =>
              router.push({
                pathname: 'payments/paymentRegister',
                params: { orderId: order.id },
              })
            }
          >
            <Text style={styles.itemsButtonText}>Pagar</Text>
          </TouchableOpacity>
        )}
        {order.orderStatus === OrderStatus.INITIATED && (
          <TouchableOpacity
            style={[styles.itemsButton, { backgroundColor: 'black' }]}
            onPress={() => {
              dispatch(setOrderItems(order.orderItems));
              router.push({
                pathname: 'orders/orderUpdate',
                params: { orderId: order.id },
              });
            }}
          >
            <Text style={styles.itemsButtonText}>EDITAR</Text>
          </TouchableOpacity>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#b00020' }]} onPress={handleDelete}>
            <Text style={styles.buttonText}>DELETAR</Text>
          </TouchableOpacity>
        </View>

        
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Itens do Pedido</Text>
              <ScrollView style={{ maxHeight: 300 }}>
               {order.orderItems.map((item) => (
                  <View key={item.id} style={styles.itemRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.itemName}>{item.product.productName}</Text>
                      <Text style={styles.itemDetails}>
                        {item.quantity} × R$ {item.product.price.toFixed(2)} = R$ {(
                          item.quantity * item.product.price
                        ).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  input: {
    width: '85%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  itemsButton: {
    width: '85%',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  itemsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '85%',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginHorizontal: 7.5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemDetails: {
    fontSize: 14,
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  modalCloseText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
