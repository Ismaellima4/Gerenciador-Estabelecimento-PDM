import { fetchOrders, findOrderById } from "@/store/orderSlice";
import { deletePayment, findPaymentById } from "@/store/paymentSlice";
import { AppDispatch, RootState } from "@/store/store";
import { registerStyles } from "@/styles/registerStyles";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function PaymentDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useLocalSearchParams<{ id: string }>();


  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch]);

  const payment = useSelector((state: RootState) =>
    findPaymentById(state, id)
  );

  const order = useSelector((state: RootState) => {
    if (!payment) return undefined;
    return findOrderById(state, payment.orderId);
  })

  const [isEditing] = useState(false);
  const [paymentTypeState, setPaymentType] = useState(payment?.paymentType || "");
  const [paymentValueState, setPaymentValue] = useState(payment?.amount);
  const [paymentDateState, setPaymentDate] = useState(payment?.date || "");
  const [paymentStatusState, setPaymentStatus] = useState(payment?.paymentStatus || "");
  const [paymentCustomerState, setPaymentCustomer] = useState(payment?.customer?.name || "");
  const [modalVisible, setModalVisible] = useState(false);

  if (!payment) {
    return Alert.alert("Info", "Pagamento não encontrado");
  }  

  const handleDelete = () => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir esse pagamento ?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => {
            if (payment) {
              dispatch(deletePayment(payment.id)).unwrap()
              .then(() => Alert.alert("Removido", "Pagamento excluído com sucesso!"))
              .catch(() => Alert.alert("Erro", "Erro ao Excluir um Pagamento"));
              router.back();
            } else {
              Alert.alert("Erro", "Pagamento não encontrado.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={registerStyles.safeArea}>
      <Pressable onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={registerStyles.container}>
          <Text style={registerStyles.label}>Produtos Adicionados</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.dropdownText}>Ver Itens do Pedido</Text>
            <AntDesign name="caretdown" size={14} color="#666" />
          </TouchableOpacity>

          <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Itens do Pedido</Text>
                <ScrollView style={{ maxHeight: 300 }}>
                  {order?.orderItems?.length ? (
                    order.orderItems.map((item) => (
                      <View key={item.id} style={styles.itemRow}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.itemName}>{item.product.productName}</Text>
                          <Text style={styles.itemDetails}>
                            {item.quantity} × R$ {item.product.price.toFixed(2)} = R${" "}
                            {(item.quantity * item.product.price).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text>Nenhum produto encontrado.</Text>
                  )}
                </ScrollView>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.modalCloseButton}
                >
                  <Text style={styles.modalCloseText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Text style={registerStyles.labelItem}>Valor Total</Text>
          <TextInput
            style={registerStyles.input}
            value={paymentValueState?.toString()}
            onChangeText={(text) => setPaymentValue(Number(text))}
            editable={false}
            placeholder="Valor TOTAL"
          />

          <Text style={registerStyles.labelItem}>Cliente</Text>
          <TextInput
            style={registerStyles.input}
            value={paymentCustomerState}
            onChangeText={setPaymentCustomer}
            editable={isEditing}
            placeholder="Cliente"
          />

          <Text style={registerStyles.labelItem}>Tipo de pagamento</Text>
          <TextInput
            style={registerStyles.input}
            value={paymentTypeState}
            onChangeText={setPaymentType}
            editable={isEditing}
            placeholder="Tipo de pagamento"
          />

          <Text style={registerStyles.labelItem}>Data</Text>
          <TextInput
            style={registerStyles.input}
            value={paymentDateState.toString()}
            onChangeText={setPaymentDate}
            editable={false}
            placeholder="Data"
            keyboardType="numeric"
          />

          <Text style={registerStyles.labelItem}>Status do pagamento</Text>
          <TextInput
            style={registerStyles.input}
            value={paymentStatusState}
            onChangeText={setPaymentStatus}
            editable={isEditing}
            placeholder="Status do pagamento"
          />

          <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
            <Text style={styles.buttonTextDelete}>DELETAR</Text>
          </TouchableOpacity>
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    height: 50,
    justifyContent: "space-between",
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemDetails: {
    fontSize: 14,
    color: "#555",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalCloseButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  modalCloseText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  buttonDelete: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonTextDelete: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
