import { AddButton } from '@/components/AddButton';
import { Search } from '@/components/Search';
import { listStyles } from '@/styles/listStyles';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';


export default function ListCustomers() {
  return (
    <View style={listStyles.container}>
      <View style={listStyles.header}>
        <Text style={listStyles.title}>Clientes</Text>
          <AddButton pathname='customerRegister'/>
      </View>
    
      <Search />

       <FlatList
          data={[]}
          keyExtractor={(item, index) => `order-${index}`}
          renderItem={() => null}>            
        </FlatList>
        
      <Text style={styles.emptyText}>Nenhum cliente cadastrado.</Text>
    
    </View>
  );
}

const styles = StyleSheet.create({
   emptyText: { 
    textAlign: 'center',
    marginTop: 20, 
    color: '#999' 
  },
});
