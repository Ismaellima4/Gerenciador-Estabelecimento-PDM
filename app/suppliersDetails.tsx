import { deleteSupplier, updateSupplier } from '@/store/supplierSlice';
import Supplier from '@/types/supplier';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

export default function SuppliersDetails() {

  const supplierParams = useLocalSearchParams();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [nameSupplier, setNameSupplier] = useState(String(supplierParams.name));
  const [cnpjSupplier, setCnpjSupplier] = useState(String(supplierParams.cnpj));
  const [phone, setPhone] = useState(String(supplierParams.phoneNumber));
  const [emailSupplier, setEmailSupplier] = useState(String(supplierParams.email));
  const [description, setDescription] = useState(String(supplierParams.additionalInformation));
 

  const handleUpdate = () => {
    if (!nameSupplier || !phone) {
      Alert.alert('Erro', 'Nome e telefone são obrigatórios.');
      return;
    }
    const oldCnpj = String(supplierParams.cnpj); 

    if (isEditing) {
      const updatedSupplier: Supplier = {
        name: nameSupplier,
        cnpj: cnpjSupplier,
        phoneNumber: phone,
        email: emailSupplier,
        additionalInformation: description,
      };

      dispatch(updateSupplier({ oldCnpj, supplier: updatedSupplier }));
      Alert.alert('Sucesso', 'Fornecedor atualizado com sucesso!');
      router.back();
    } else {
      setIsEditing(true);
    }
  };


  const handleDelete = () => {
    dispatch(deleteSupplier(cnpjSupplier));
    Alert.alert('Removido', 'Fornecedor excluído com sucesso!');
    router.back(); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.profileImage}
          />
        </View>

        <TextInput
          style={styles.input}
          value={nameSupplier}
          onChangeText={setNameSupplier}
          editable={isEditing}
          placeholder="Nome"
        />
        <TextInput
          style={styles.input}
          value={cnpjSupplier}
          onChangeText={setCnpjSupplier}
          editable={isEditing}
          placeholder="CNPJ"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          editable={isEditing}
          placeholder="Telefone"
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          value={emailSupplier}
          onChangeText={setEmailSupplier}
          editable={isEditing}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={description}
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
});