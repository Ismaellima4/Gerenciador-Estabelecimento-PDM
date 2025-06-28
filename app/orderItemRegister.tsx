import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function OrderItemForm() {
  return (
      <SafeAreaView style={styles.safeArea}>
        <Pressable onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.label}>Produto <Text style={styles.required}>*</Text></Text>
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
                <Text style={styles.label}>Quantidade</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Preço Unitário</Text>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
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

