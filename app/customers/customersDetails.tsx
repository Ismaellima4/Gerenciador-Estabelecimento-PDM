import {
  removeCustomer,
  updateCustomer,
  findCustomerById,
} from '@/store/customerSlice';
import { RootState, AppDispatch } from '@/store/store';
import { registerStyles } from '@/styles/registerStyles';
import Customer from '@/types/customer';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function CustomersDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useLocalSearchParams();
  const customer = useSelector((state: RootState) =>
    findCustomerById(state, String(id))
  );

  const [isEditing, setIsEditing] = useState(false);
  const [customerNameState, setCustomerName] = useState(customer?.name || '');
  const [cpfState] = useState(customer?.cpf || '');
  const [phoneState, setPhone] = useState(customer?.phoneNumber || '');
  const [emailState, setEmail] = useState(customer?.email || '');

  if (!customer) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centeredMessage}>
          <Text style={styles.errorMessage}>Cliente não encontrado.</Text>
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
      `Deseja realmente excluir o cliente "${customerNameState}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(removeCustomer(customer.id)).unwrap();
              Alert.alert('Sucesso', 'Cliente excluído com sucesso!');
              router.back();
            } catch {
              Alert.alert('Erro', 'Erro ao excluir cliente.');
            }
          },
        },
      ]
    );
  };

  const handleUpdate = async () => {
    if (isEditing) {
      const updatedCustomer: Customer = {
        id: customer.id,
        name: customerNameState,
        cpf: cpfState,
        phoneNumber: phoneState,
        email: emailState,
        payments: customer.payments, // mantém histórico de pagamentos
      };

      try {
        await dispatch(updateCustomer(updatedCustomer)).unwrap();
        Alert.alert('Sucesso', 'Cliente atualizado com sucesso!');
        setIsEditing(false);
      } catch {
        Alert.alert('Erro', 'Erro ao atualizar cliente.');
      }
    } else {
      setIsEditing(true);
    }
  };

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
            <Text style={styles.buttonText}>
              {isEditing ? 'SALVAR' : 'EDITAR'}
            </Text>
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
  input: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '100%',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 30,
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
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
    textAlign: 'center',
  },
});
