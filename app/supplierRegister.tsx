import FormActionButtons from '@/components/FormActionButton';
import { registerStyles } from '@/styles/registerStyles';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { addSupplier } from '../store/supplierSlice';

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
      <SafeAreaView style={registerStyles.safeArea}>
        <ScrollView>
          <View style={registerStyles.container}>
            <View style={registerStyles.inputsWrapper}>
              <Text style={registerStyles.label}>Nome *</Text>
              <TextInput
                style={registerStyles.input}
                value={supplierName}
                onChangeText={setSupplierName}
                placeholder="Nome do fornecedor"
                placeholderTextColor="#888"
              />

              <Text style={registerStyles.label}>CNPJ</Text>
              <TextInput
                style={registerStyles.input}
                value={cnpj}
                onChangeText={setCnpj}
                placeholder="CNPJ"
                placeholderTextColor="#888"
              />

              <Text style={registerStyles.label}>Telefone *</Text>
              <TextInput
                style={registerStyles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
              />

              <Text style={registerStyles.label}>E-mail</Text>
              <TextInput
                style={registerStyles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="email@exemplo.com"
                placeholderTextColor="#888"
                keyboardType="email-address"
              />

              <Text style={registerStyles.label}>Informações adicionais</Text>
              <TextInput
                style={[registerStyles.input, registerStyles.multiline]}
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
