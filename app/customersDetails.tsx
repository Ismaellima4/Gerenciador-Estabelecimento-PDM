import { deleteCustomerById, findCustomerById, updateCustomer } from "@/store/customerSlice";
import { RootState } from "@/store/store";
import { registerStyles } from "@/styles/registerStyles";
import customer from "@/types/customer";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";



export default function CustomersDetails() {

  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();

  const customer = useSelector((state: RootState) =>
    findCustomerById(state, String(id))
  );


  const [isEditing, setIsEditing] = useState(false);

  const [customerNameState, setCustomerName] = useState(customer?.name || '');
  const [cpfState, setCpf] = useState(customer?.cpf || '');
  const [phoneState, setPhone] = useState(customer?.phone || '');
  const [emailState, setEmail] = useState(customer?.email || '');

  if (!customer) {
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.centeredMessage}>
            <Text style={styles.errorMessage}>Fornecedor não encontrado.</Text>
            <TouchableOpacity style={styles.backButton} onPress={router.back}>
              <Text style={styles.backButtonText}>Voltar para a lista</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    );
  }

  const handleDelete = () => {

    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir o cliente "${customerNameState}"?`,
        [
          { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Excluir',
              onPress: () => {
                dispatch(deleteCustomerById({ id: customer.id }));
                Alert.alert('Removido', 'Cliente excluído com sucesso!');
                router.back();
              },
            },
        ],

          { cancelable: true }
    );      
  }

  const handleUpdate = () => {
    if (isEditing) {
      const updatedCustomer: customer = {
        id: customer.id,
        name: customerNameState,
        cpf: cpfState,
        phone: phoneState,
        email: emailState,
        payments: customer.payments,
      };
      dispatch(updateCustomer(updatedCustomer));
      Alert.alert('Sucesso', 'Cliente atualizado com sucesso!');
    }
    setIsEditing(!isEditing); 
  }

    return (
    <SafeAreaView style={registerStyles.safeArea}>
    
        <ScrollView contentContainerStyle={registerStyles.container}>

           <TextInput
            style={styles.input}
            value={customerNameState}
            onChangeText={setCustomerName}
            editable={isEditing}
            placeholder="Nome"
          />

          <TextInput
            style={styles.input}
            value={cpfState}
            onChangeText={setCpf}
            editable={isEditing}
            placeholder="CPF"
    
          />
          <TextInput
            style={styles.input}
            value={phoneState}
            onChangeText={setPhone}
            editable={isEditing}
            placeholder="Telefone"
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={emailState}
            onChangeText={setEmail}
            editable={isEditing}
            placeholder="E-mail"
          
          />
          
           <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                 <Text style={styles.buttonText}>{isEditing ? 'SALVAR' : 'EDITAR'}</Text>
              </TouchableOpacity>
                {!isEditing && (
                    <TouchableOpacity style={styles.button} onPress={handleDelete}>
                    <Text style={styles.buttonText}>DELETAR</Text>
                    </TouchableOpacity>
                )}
           </View>

        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  box: {
    width: '85%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flexGrow: 1, 
    alignItems: 'center',
    paddingVertical: 20, 
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderIconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 60,
    color: '#888',
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
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 15, 
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
    marginTop: 20, 
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center'
  },
  
});