import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addSupplier } from '../../store/supplierSlice';
import { router } from 'expo-router';
import type Supplier from '@/types/supplier';

export default function FornecedorForm() {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');

  const dispatch = useDispatch();

  const saveSupplier = () => {
    if (!name || !phoneNumber) {
      Alert.alert('Erro', 'Nome e telefone são obrigatórios.');
      return;
    }

    const newSupplier: Supplier = {
      name,
      cnpj,
      phoneNumber,
      email,
      additionalInformation,
    };

    dispatch(addSupplier(newSupplier));
    Alert.alert('Sucesso', 'Fornecedor salvo!');
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nome do fornecedor"
      />

      <Text style={styles.label}>CNPJ</Text>
      <TextInput
        style={styles.input}
        value={cnpj}
        onChangeText={setCnpj}
        placeholder="CNPJ"
      />

      <Text style={styles.label}>Telefone *</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="(00) 00000-0000"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="email@exemplo.com"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Informações adicionais</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        multiline
        numberOfLines={4}
        value={additionalInformation}
        onChangeText={setAdditionalInformation}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveSupplier}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 4, marginTop: 12 },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#333',
  },
  multiline: { height: 100, textAlignVertical: 'top' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  button: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 14 },
});
