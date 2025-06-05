import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const suppliers = [
    {id:'1', fornecedor:'Nome Fornecedor', contato:'Contato', cnpj:'CNPJ'},
    {id:'2', fornecedor:'Nome Fornecedor', contato:'Contato', cnpj:'CNPJ'},
    {id:'3', fornecedor:'Nome Fornecedor', contato:'Contato', cnpj:'CNPJ'},
    {id:'4', fornecedor:'Nome Fornecedor', contato:'Contato', cnpj:'CNPJ'}
]

export default function listSuppliers(){

    return (
     <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fornecedores</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addText}>ADICIONAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Buscar" placeholderTextColor="#888" />
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color="#888" style={styles.menuIcon} />
        </TouchableOpacity>
      </View>


      <FlatList
        data={suppliers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.productTitle}>{item.fornecedor}</Text>
              <Text style={styles.productInfo}>{item.contato}</Text>
              <Text style={styles.productInfo}>{item.cnpj}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  addText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  menuIcon: {
    marginLeft: 8,
  },
  productList: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  productTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productInfo: {
    color: '#555',
    fontSize: 13,
  },
  quantityText: {
    textAlign: 'right',
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: '#e0e0e0'
  },
});
