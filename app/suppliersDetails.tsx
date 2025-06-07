import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuppliersDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('João Silva');
  const [cnpj, setCnpj] = useState('00.000.000/0000-00');
  const [phone, setPhone] = useState('(11) 99999-9999');
  const [address, setAddress] = useState('Endereço');
  const [email, setEmail] = useState('joao@exemplo.com');
  const [description, setDescription] = useState(
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been'
  );

  const handleEditSave = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      console.log('Dados salvos:', { name, cnpj, phone, address, email, description });
      // Aqui você faria uma chamada à API para salvar os dados no backend
    }
  };

  const handleDelete = () => {
    // Lógica para deletar o perfil
    console.log('Deletar perfil');
    // Aqui você faria uma chamada à API para deletar o perfil
    alert('Funcionalidade de deletar implementada.');
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

        {/* Inputs de texto */}
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={isEditing}
          placeholder="Nome"
        />
        <TextInput
          style={styles.input}
          value={cnpj}
          onChangeText={setCnpj}
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
          value={address}
          onChangeText={setAddress}
          editable={isEditing}
          placeholder="Endereço"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
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
          <TouchableOpacity style={styles.button} onPress={handleEditSave}>
            <Text style={styles.buttonText}>{isEditing ? 'SALVAR' : 'EDITAR'}</Text>
          </TouchableOpacity>

          {!isEditing && ( // O botão "Deletar" só aparece quando não está editando
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
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
    justifyContent: 'center', 
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
  deleteButton: {
    // Estilos específicos para o botão de deletar, se necessário
    // backgroundColor: '#dc3545', // Exemplo de cor de perigo
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});