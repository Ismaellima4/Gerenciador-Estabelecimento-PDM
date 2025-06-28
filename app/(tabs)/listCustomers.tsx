import { Search } from '@/components/Search';
import { Link } from 'expo-router';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function ListCustomers() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Clientes</Text>
        <Link href='/custormerRegister' asChild>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addText}>ADICIONAR</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <Search />
       ListEmptyComponent={<Text style={styles.emptyText}>Nenhum cliente cadastrado.</Text>}
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: 16, 
    paddingTop: 24, 
    backgroundColor: '#fff' 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,  
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold',
    paddingHorizontal : 10
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

  image: {
    width: '100%',
    height: '100%'
  },
   emptyText: { 
    textAlign: 'center',
    marginTop: 20, 
    color: '#999' 
  },
});
