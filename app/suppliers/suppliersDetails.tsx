import { AppDispatch, RootState } from '@/store/store';
import {
  findSupplierById,
  removeSupplier,
  updateSupplier,
} from '@/store/supplierSlice';
import Supplier from '@/types/supplier';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function SuppliersDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useLocalSearchParams();

  const supplier = useSelector((state: RootState) =>
    findSupplierById(state, String(id))
  );

  const [isEditing, setIsEditing] = useState(false);

  const [supplierNameState, setSupplierName] = useState(supplier?.supplierName || '');
  const [cnpjState, setCnpjSupplier] = useState(supplier?.cnpj || '');
  const [phoneState, setPhone] = useState(supplier?.phoneNumber || '');
  const [emailState, setEmailSupplier] = useState(supplier?.email || '');
  const [descriptionState, setDescription] = useState(supplier?.additionalInformation || '');

  if (!supplier) {
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
      `Tem certeza que deseja excluir o fornecedor "${supplierNameState}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await dispatch(removeSupplier(supplier.id)).unwrap();
              Alert.alert('Removido', 'Fornecedor excluído com sucesso!');
              router.back();
            } catch  {
              Alert.alert('Erro', 'Falha ao excluir fornecedor.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleUpdate = async () => {
    if (isEditing) {
      const updatedSupplier: Supplier = {
        id: supplier.id,
        supplierName: supplierNameState,
        cnpj: cnpjState,
        phoneNumber: phoneState,
        email: emailState,
        additionalInformation: descriptionState,
      };

      try {
        await dispatch(updateSupplier(updatedSupplier)).unwrap();
        Alert.alert('Sucesso', 'Fornecedor atualizado com sucesso!');
        setIsEditing(false);
      } catch {
        Alert.alert('Erro', 'Falha ao atualizar fornecedor.');
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={styles.profileImage}
            />
          </View>

          <TextInput
            style={styles.input}
            value={supplierNameState}
            onChangeText={setSupplierName}
            editable={isEditing}
            placeholder="Nome"
          />
          <TextInput
            style={styles.input}
            value={cnpjState}
            onChangeText={setCnpjSupplier}
            editable={isEditing}
            placeholder="CNPJ"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={phoneState}
            onChangeText={setPhone}
            editable={isEditing}
            placeholder="Telefone"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            value={emailState}
            onChangeText={setEmailSupplier}
            editable={isEditing}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={descriptionState}
            onChangeText={setDescription}
            editable={isEditing}
            placeholder="Descrição"
            multiline
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    alignSelf: 'center',
  },
});
