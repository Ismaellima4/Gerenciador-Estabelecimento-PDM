import { createPayment } from '@/store/paymentSlice';
import { AppDispatch, RootState } from '@/store/store';
import { registerStyles } from '@/styles/registerStyles';
import { PaymentType } from '@/types/enum/payment-type.enum';
import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

export default function PaymentRegister() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const order = useSelector((state: RootState) =>
    state.order.list.find(o => o.id === orderId)
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [paymentTypeModalVisible, setPaymentTypeModalVisible] = useState(false);
  const [customerModalVisible, setCustomerModalVisible] = useState(false);

  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const customers = useSelector((state: RootState) => state.customer.list);

  const paymentOptions = Object.entries(PaymentType).map(([key, value]) => ({
    key,
    label: PaymentType[key as keyof typeof PaymentType],
  }));

  const handlePay = async () => {
    if (!selectedPaymentType) {
      return Alert.alert('Erro', 'Selecione uma forma de pagamento.');
    }

    if (!orderId || typeof orderId !== 'string') {
      return Alert.alert('Erro', 'Pedido não encontrado.');
    }

    const payload = {
      orderId: orderId,
      paymentType: selectedPaymentType,
      customerId: selectedCustomerId ?? undefined,

    };

    try {
      const result = await dispatch(createPayment(payload));
      if (createPayment.fulfilled.match(result)) {
        Alert.alert('Pagamento confirmado', 'Pedido finalizado com sucesso!');
        
        router.replace('/listOrder');
      } else {
        Alert.alert('Erro', 'Não foi possível registrar o pagamento.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro inesperado', 'Tente novamente mais tarde.');
    }
  };

  const total = order?.orderItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  ) ?? 0;

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
                  {order?.orderItems.map((item) => (
                    <View key={item.id} style={{ marginBottom: 8 }}>
                      <Text style={{ fontSize: 16 }}>
                        {item.product.productName} - {item.quantity} x R${item.product.price.toFixed(2)}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
                <View style={{ marginTop: 12 }}>
                  <Text style={{ fontWeight: 'bold' }}>
                    Total: R$ {total.toFixed(2)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>

          <Text style={registerStyles.label}>Valor Total</Text>
          <View style={styles.amountBox}>
            <Text style={styles.amountText}>
              R$ {total.toFixed(2)}
            </Text>
          </View>

          <Text style={registerStyles.label}>Cliente (opcional)</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setCustomerModalVisible(true)}>
            <TextInput
              style={styles.dropdownTextInput}
              placeholder="Selecione um cliente"
              value={
                selectedCustomerId
                  ? customers.find(c => c.id === selectedCustomerId)?.name ?? ''
                  : ''
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
                      setSelectedPaymentType(option.key as PaymentType);
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
