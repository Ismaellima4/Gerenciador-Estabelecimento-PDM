import { AddButton } from '@/components/AddButton';
import { Search } from '@/components/Search';
import { RootState } from '@/store/store';
import { listStyles } from '@/styles/listStyles';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';


export default function ListCustomers() {

  const customers = useSelector((state: RootState) => state.customer.list);

  return (

    <View style={listStyles.container}>
      <View style={listStyles.header}>
        <Text style={listStyles.title}>Clientes</Text>
          <AddButton pathname='customerRegister'/>
      </View>
    
      <Search />

       <FlatList
          data={customers}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({item}) => (
            <Link
              href={{
                pathname: '/customersDetails',
                params: {
                  id: item.id,
                }
              }}
              asChild
            >
                <TouchableOpacity>
                  <View style={listStyles.card}>
                    <Text style={listStyles.cardTitle}>{item.name}</Text>
                    <Text style={listStyles.cardInfo}>Telefone: {item.phone}</Text>
                    {item.cpf && <Text style={listStyles.cardInfo}>CPF: {item.cpf}</Text>}
                    {item.email && <Text style={listStyles.cardInfo}>Email: {item.email}</Text>}
                  </View>
                </TouchableOpacity>
            </Link>
          )}
          ListEmptyComponent={
            <Text style={listStyles.emptyText}>Nenhum cliente cadastrado.</Text>
          }
        />
    
    </View>
  );
}


