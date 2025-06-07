import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const produtos = [
  { id: '1', nome: 'Nome do produto', categoria: 'categoria' },
  { id: '2', nome: 'Nome do produto', categoria: 'categoria' },
  { id: '3', nome: 'Nome do produto', categoria: 'categoria' },
  { id: '4', nome: 'Nome do produto', categoria: 'categoria' },
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

      <View style={styles.bannerSection}>
        <View style={styles.mainBanner} />
        <View style={styles.sideBanner} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Buscar" placeholderTextColor="#888" />
        <Ionicons name="ellipsis-vertical" size={20} color="#888" style={styles.menuIcon} />
      </View>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href="/productDetails" asChild>
            <TouchableOpacity>
              <View style={styles.card}>
                <View style={styles.cardInfo}>
                  <View style={styles.avatar}><Text style={styles.avatarText}>F</Text></View>
                  <View>
                    <Text style={styles.productName}>{item.nome}</Text>
                    <Text style={styles.productCategory}>{item.categoria}</Text>
                  </View>
                </View>
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image" size={24} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={styles.productList}
      />
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
    marginTop: 20,
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
  bannerSection: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  mainBanner: {
    flex: 1,
    backgroundColor: '#ddd',
    height: 120,
    borderRadius: 20,
    marginRight: 8,
  },
  sideBanner: {
    width: 60,
    backgroundColor: '#ddd',
    borderRadius: 30,
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
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productName: {
    fontWeight: 'bold',
  },
  productCategory: {
    color: '#666',
    fontSize: 12,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
