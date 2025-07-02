import { registerStyles } from "@/styles/registerStyles";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Keyboard, Modal, Pressable, SafeAreaView, ScrollView, TouchableOpacity, Text, View, StyleSheet, Alert } from "react-native";

export default function CustomersDetails() {
  const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = () => {
       
         Alert.alert('Removido', 'Fornecedor excluído com sucesso!');

        //falta implementar a lógica de exclusão
    }


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

          <Text style={registerStyles.label}>Valor Total</Text>
          <View style={styles.box}>
            <Text style={styles.text}>R$ 0,00</Text>
          </View>

          <Text style={registerStyles.label}>Cliente</Text>
          <View style={styles.box}>
            <Text style={styles.text}>Clinte</Text>
          </View>
        

          <Text style={registerStyles.label}>Forma de pagamento</Text>
          <View style={styles.box}>
            <Text style={styles.text}>PIX</Text>
          </View>


          
              
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
