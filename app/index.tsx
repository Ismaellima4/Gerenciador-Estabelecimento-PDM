import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // se quiser usar ícone real

const CadastroFornecedor: React.FC = () => {
  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [infoAdicional, setInfoAdicional] = useState('');

  const handleSalvar = () => {
    console.log({ nome, cpfCnpj, endereco, telefone, email, infoAdicional });
  };

  const handleCancelar = () => {
    setNome('');
    setCpfCnpj('');
    setEndereco('');
    setTelefone('');
    setEmail('');
    setInfoAdicional('');
  };

  const handleVoltar = () => {
    console.log('Voltar');
    // aqui você pode usar navigation.goBack() se estiver usando React Navigation
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Topo com botão de voltar */}
        <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
          <Icon name="arrow-back" size={26} color="black" /> 
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.label}>
            Nome do fornecedor <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do fornecedor"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>CPF/CNPJ</Text>
          <TextInput
            style={styles.input}
            value={cpfCnpj}
            onChangeText={setCpfCnpj}
          />

          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
          />

          <Text style={styles.label}>
            Telefone <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="(00) 00000-0000"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Informações adicionais</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            multiline
            value={infoAdicional}
            onChangeText={setInfoAdicional}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSalvar}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCancelar}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    paddingVertical: 20,
    width: 20,
    marginTop: 20,
    marginLeft: 10,
  },
  backText: {
    fontSize: 24,
    color: 'black',
  },
  container: {
    padding: 20,
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  required: {
    color: 'red',
  },
  input: {
    backgroundColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CadastroFornecedor;
