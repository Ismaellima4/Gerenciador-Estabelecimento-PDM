import { registerStyles } from '@/styles/registerStyles';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

export default function PaymentRegister() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={registerStyles.safeArea}>
      <Pressable onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={registerStyles.container}>

          <Text style={registerStyles.label}>Produtos Adicionados</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setModalVisible(true)}
          >
            <TextInput
              style={styles.dropdownTextInput}
              placeholder="Visualizar produtos"
              editable={false}
              pointerEvents="none"
            />
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

          
          <Text style={registerStyles.label}>Valor Total</Text>
          <View style={styles.amountBox}>
            <Text style={styles.amountText}>R$ 0,00</Text>
          </View>

          <Text style={registerStyles.label}>Cliente (opcional)</Text>
          <TouchableOpacity style={styles.dropdown}>
            <TextInput
              style={styles.dropdownTextInput}
              placeholder="Selecione um cliente"
              editable={false}
              pointerEvents="none"
            />
            <AntDesign name="caretdown" size={14} color="#666" />
          </TouchableOpacity>
          <Text style={registerStyles.label}>Forma de Pagamento</Text>
          <TouchableOpacity style={styles.dropdown}>
            <TextInput
              style={styles.dropdownTextInput}
              placeholder="Selecione uma forma de pagamento"
              editable={false}
              pointerEvents="none"
            />
            <AntDesign name="caretdown" size={14} color="#666" />
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.confirmButton]}>
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
