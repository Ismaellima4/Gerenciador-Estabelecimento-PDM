import { findPaymentById } from "@/store/paymentSlice";
import { RootState } from "@/store/store";
import { registerStyles } from "@/styles/registerStyles";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Keyboard, Modal, Pressable, SafeAreaView, ScrollView, TouchableOpacity, Text, View, StyleSheet, Alert, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
;

export default function PaymentDetails() {


  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();

  const payment = useSelector((state: RootState) =>
    findPaymentById(state, String(id))
  );

  const [isEditing, setIsEditing] = useState(false);
  const [paymentTypeState, setPaymentType] = useState(payment?.paymentType || '');
  const [paymentValueState, setPaymentValue] = useState(payment?.amount);
  const [paymentDateState, setPaymentDate] = useState(payment?.date || '');
  const [paymentStatusState, setPaymentStatus] = useState(payment?.paymentStatus || '');
  const [paymentCustomerState, setPaymentCustomer] = useState(payment?.customer.name || '');
  




  const [modalVisible, setModalVisible] = useState(false);



  const handleUpdate = () => {

    setIsEditing(!isEditing); 
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
            <Text style={styles.dropdownText}>Visualizar produtos</Text>
            <AntDesign name="caretdown" size={14} color="#666" />
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={() => setModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Produtos da Compra</Text>

              </View>
            </TouchableOpacity>
          </Modal>

          <TextInput
            style={registerStyles.input}
            value={paymentValueState?.toString()}
            onChangeText={setPaymentValue.toString}
            editable={false}
            placeholder="Valor TOTAL"
          />

          <TextInput
            style={registerStyles.input}
            value={paymentCustomerState}
            onChangeText={setPaymentCustomer}
            editable={isEditing}
            placeholder="cliente"
          />

          <TextInput
            style={registerStyles.input}
            value={paymentTypeState}
            onChangeText={setPaymentType}
            editable={isEditing}
            placeholder="Tipo de pagamento"
          />

          <TextInput
            style={registerStyles.input}
            value={paymentDateState.toString()}
            onChangeText={setPaymentDate}
            editable={false}
            placeholder="Data"
            keyboardType="numeric"
          />

          <TextInput
            style={registerStyles.input}
            value={paymentStatusState}
            onChangeText={setPaymentStatus}
            editable={isEditing}
            placeholder="Status do pagamento"
          />

          <TouchableOpacity style={styles.buttonDelete} onPress={handleUpdate}>
            <Text style={styles.buttonTextDelete}>EDITAR</Text>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  box: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#e0e0e0',
  },
  text: {
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

  buttonDelete: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonTextDelete: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
