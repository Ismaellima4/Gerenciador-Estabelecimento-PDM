import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addSupplier } from '../store/supplierSlice';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormActionButtons from '@/components/FormActionButton';

export default function SupplierRegistration() {
  const [supplierName, setSupplierName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');

  const dispatch = useDispatch();

  const saveSupplier = () => {
    if (!supplierName || !phoneNumber) {
      Alert.alert('Erro', 'Nome e telefone são obrigatórios.');
      return;
    }

    const newSupplier = {
      supplierName,
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.inputsWrapper}>
              <Text style={styles.label}>Nome *</Text>
              <TextInput
                style={styles.input}
                value={supplierName}
                onChangeText={setSupplierName}
                placeholder="Nome do fornecedor"
                placeholderTextColor="#888"
              />

              <Text style={styles.label}>CNPJ</Text>
              <TextInput
                style={styles.input}
                value={cnpj}
                onChangeText={setCnpj}
                placeholder="CNPJ"
                placeholderTextColor="#888"
              />

              <Text style={styles.label}>Telefone *</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
              />

              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="email@exemplo.com"
                placeholderTextColor="#888"
                keyboardType="email-address"
              />

              <Text style={styles.label}>Informações adicionais</Text>
              <TextInput
                style={[styles.input, styles.multiline]}
                multiline
                numberOfLines={4}
                value={additionalInformation}
                onChangeText={setAdditionalInformation}
                placeholder="Informações adicionais sobre o fornecedor"
                placeholderTextColor="#888"
              />
            </View>

            <FormActionButtons
              onSave={saveSupplier}
              onCancel={() => router.back()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  inputsWrapper: {
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 13,
    color: '#333',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: 'top',
    lineHeight: 22,
  },
});
