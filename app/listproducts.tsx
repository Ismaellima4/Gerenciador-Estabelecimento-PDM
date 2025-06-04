import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const produtos = [
  { id: '1', titulo: 'Titulo Produto', categoria: 'Categoria', fornecedor: 'Fornecedor', qtdInicial: 100, qtdAtual: 75 },
  { id: '2', titulo: 'Titulo Produto', categoria: 'Categoria', fornecedor: 'Fornecedor', qtdInicial: 200, qtdAtual: 180 },
  { id: '3', titulo: 'Titulo Produto', categoria: 'Categoria', fornecedor: 'Fornecedor', qtdInicial: 50, qtdAtual: 30 },
  { id: '4', titulo: 'Titulo Produto', categoria: 'Categoria', fornecedor: 'Fornecedor', qtdInicial: 150, qtdAtual: 150 },
];

export default function ProdutosScreen() {

  return (
     <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Produtos</Text>
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
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.productTitle}>{item.titulo}</Text>
              <Text style={styles.productInfo}>{item.categoria}</Text>
              <Text style={styles.productInfo}>{item.fornecedor}</Text>
            </View>
            <View>
              <Text style={styles.quantityText}>Qtd. inicial</Text>
              <Text style={styles.quantityText}>Qtd. atual</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.productList}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}><Text>Produtos</Text></TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}><Text>Fornecedores</Text></TouchableOpacity>
      </View>
    </View>
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
