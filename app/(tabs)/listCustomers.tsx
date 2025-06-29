import { AddButton } from '@/components/AddButton';
import { Search } from '@/components/Search';
import { listStyles } from '@/styles/listStyles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function ListCustomers() {
  return (
    <View style={listStyles.container}>
      <View style={listStyles.header}>
        <Text style={listStyles.title}>Clientes</Text>
          <AddButton pathname='customerRegister'/>
      </View>
    
      <Search />
      <Text style={styles.emptyText}>Nenhum cliente cadastrado.</Text>
    
    </View>
  );
}

const styles = StyleSheet.create({
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
