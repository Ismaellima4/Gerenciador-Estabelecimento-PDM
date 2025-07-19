import { registerStyles } from '@/styles/registerStyles';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { findCustomerById } from '@/store/customerSlice';
import { createOrder, findOrderById } from '@/store/orderSlice';
import { PaymentType } from '@/types/enum/payment-type.enum';
import { PaymentStatus } from '@/types/enum/payment-status.enum';
import { OrderStatus } from '@/types/enum/order-status.enum';
import { createPayment } from '@/store/paymentSlice';
import { randomUUID } from 'expo-crypto';
import { updateStockAfterOrder } from '@/utils/updateStock';

export default function PaymentRegister() {
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentTypeModalVisible, setPaymentTypeModalVisible] = useState(false);
  const [customerModalVisible, setCustomerModalVisible] = useState(false);

  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const customers = useSelector((state: RootState) => state.customer.list);
  const products = useSelector((state: RootState) => state.product.list);

  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const order = useSelector((state: RootState) =>
    orderId ? findOrderById(state, String(orderId)) : undefined
  );

  const selectedCustomer = useSelector((state: RootState) =>
    selectedCustomerId ? findCustomerById(state, selectedCustomerId) : undefined
  );

  const parsedItems = order?.orderItems ?? [];
  const parsedTotal = parsedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const paymentOptions = Object.entries(PaymentType).map(([key, value]) => ({
    key,
    label: PaymentType[key as keyof typeof PaymentType],
  }));

  const handlePay = () => {
    if (!selectedPaymentType) {
      return Alert.alert('Erro', 'Selecione uma forma de pagamento.');
    }

    if (!parsedItems || parsedItems.length === 0) {
      return Alert.alert('Erro', 'Itens do pedido não encontrados.');
    }

    if (!order) {
      return Alert.alert('Erro', 'Pedido não encontrado.');
    }

    const orderData = {
      ...order,
      orderStatus: OrderStatus.COMPLETED,
    };

    const paymentData = {
      id: randomUUID(),
      order: orderData,
      amount: parsedTotal,
      date: new Date(),
      customer: selectedCustomer ?? undefined,
      paymentType: PaymentType[selectedPaymentType as keyof typeof PaymentType],
      paymentStatus: PaymentStatus.COMPLETED,
    };

    dispatch(createOrder(orderData));
    dispatch(createPayment(paymentData));

    updateStockAfterOrder(products, parsedItems, dispatch);

    Alert.alert('Pagamento realizado com sucesso!');
    router.push('/listOrder');
  };

  return (
    <SafeAreaView style={registerStyles.safeArea}>
      <Pressable onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={registerStyles.container}>
          <Text style={registerStyles.label}>Produtos Adicionados</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
            <TextInput
              style={styles.dropdownTextInput}
              placeholder="Visualizar produtos"
              editable={false}
              pointerEvents="none"
            />
            <AntDesign name="caretdown" size={14} color="#666" />
          </TouchableOpacity>

          <Modal visible={modalVisible} transparent animationType="slide">
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={() => setModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Produtos da Compra</Text>
                <ScrollView style={{ maxHeight: 300 }}>
                  {parsedItems.map((item: any, index: number) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                      <Text style={{ fontWeight: 'bold' }}>{item.product.productName}</Text>
                      <Text>
                        {item.quantity} × R$ {item.product.price.toFixed(2)} = R${' '}
                        {(item.quantity * item.product.price).toFixed(2)}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>

          
          <Text style={registerStyles.label}>Valor Total</Text>
          <View style={styles.amountBox}>
            <Text style={styles.amountText}>R$ {parsedTotal.toFixed(2).replace('.', ',')}</Text>
          </View>

          <Text style={registerStyles.label}>Cliente (opcional)</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setCustomerModalVisible(true)}>
            <TextInput
              style={styles.dropdownTextInput}
              placeholder="Selecione um cliente"
              value={
                selectedCustomer ? `${selectedCustomer.name} - ${selectedCustomer.phoneNumber}` : ''
              }
              editable={false}
              pointerEvents="none"
            />
            <AntDesign name="caretdown" size={14} color="#666" />
          </TouchableOpacity>

          <Modal visible={customerModalVisible} transparent animationType="slide">
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={() => setCustomerModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecione um cliente</Text>
                {customers.map((cust) => (
                  <TouchableOpacity
                    key={cust.id}
                    onPress={() => {
                      setSelectedCustomerId(cust.id);
                      setCustomerModalVisible(false);
                    }}
                    style={{ paddingVertical: 10 }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      {cust.name} - {cust.phoneNumber}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

          {/* Pagamento */}
          <Text style={registerStyles.label}>Forma de Pagamento</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setPaymentTypeModalVisible(true)}>
            <TextInput
              style={styles.dropdownTextInput}
              placeholder="Selecione uma forma de pagamento"
              value={
                selectedPaymentType
                  ? PaymentType[selectedPaymentType as keyof typeof PaymentType]
                  : ''
              }
              editable={false}
              pointerEvents="none"
            />
            <AntDesign name="caretdown" size={14} color="#666" />
          </TouchableOpacity>

          <Modal visible={paymentTypeModalVisible} transparent animationType="slide">
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={() => setPaymentTypeModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecione a forma de pagamento</Text>
                {paymentOptions.map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    onPress={() => {
                      setSelectedPaymentType(option.key);
                      setPaymentTypeModalVisible(false);
                    }}
                    style={{ paddingVertical: 10 }}
                  >
                    <Text style={{ fontSize: 16 }}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

          {/* Botões */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={router.back}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handlePay}>
              <Text style={styles.buttonText}>Pagar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    height: 50,
  },
  dropdownTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  amountBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
  },
  amountText: {
    fontSize: 18,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000044',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
