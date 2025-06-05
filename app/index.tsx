import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
          <Icon name="arrow-back" size={30} color="black" /> 
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.label}>
            Nome do fornecedor <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>CPF/CNPJ</Text>
          <TextInput
            style={styles.input}
            placeholder="123.456.789-12 ou 12.345.678/0001-95"
            value={cpfCnpj}
            onChangeText={setCpfCnpj}
          />

          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o endereço"
            value={endereco}
            onChangeText={setEndereco}
          />

          <Text style={styles.label}>
            Telefone <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="(12) 34567-8901"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Digite o e-mail"
            autoComplete="email"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Informações adicionais</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            multiline
            placeholder="Digite informações adicionais"
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
    paddingVertical: 30,
    width: 30,
    marginTop: 20,
    marginLeft: 20,
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
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
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
