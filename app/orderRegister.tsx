
import { registerStyles } from '@/styles/registerStyles';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function OrderItemForm() {
  return (
      <SafeAreaView style={registerStyles.safeArea}>
        <Pressable onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={registerStyles.container}>

            <Text style={registerStyles.label}> Adicionar Produto <Text style={styles.required}>*</Text></Text>
            <TouchableOpacity style={styles.dropdown}>
              <TextInput
                style={styles.dropdownTextInput}
                placeholder="Selecione um produto"
                placeholderTextColor="#999"
              />
              <AntDesign name="caretdown" size={14} color="#666" />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={registerStyles.label}>Quantidade</Text>
                <TextInput
                  style={registerStyles.input}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={styles.column}>
                <Text style={registerStyles.label}>Preço Unitário</Text>
                <View style={styles.priceContainer}>
                 <Text style={styles.column}>R$</Text>
                  <TextInput
                    style={styles.price}
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                    editable={false} 
                    placeholder='0,00'
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </Pressable>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  required: {
    color: 'red',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  dropdownTextInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 12,
    backgroundColor: '#fff',
  },
  price: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
});

