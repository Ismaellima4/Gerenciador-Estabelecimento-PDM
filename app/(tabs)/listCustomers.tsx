import { AddButton } from '@/components/AddButton';
import { Search } from '@/components/Search';
import { fetchCustomers } from '@/store/customerSlice';
import { AppDispatch, RootState } from '@/store/store';
import { listStyles } from '@/styles/listStyles';
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


export default function ListCustomers() {
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector((state: RootState) => state.customer.list);

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])

  return (

    <View style={listStyles.container}>
      <View style={listStyles.header}>
        <Text style={listStyles.title}>Clientes</Text>
          <AddButton pathname='customers/customerRegister'/>
      </View>
    
      <Search items={customers} searchBy="name" getDetailsPath={() => 'customers/customersDetails'}/>

       <FlatList
          data={customers}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({item}) => (
            <Link
              href={{
                pathname: 'customers/customersDetails',
                params: {
                  id: item.id,
                }
              }}
              asChild
            >
                <TouchableOpacity>
                  <View style={listStyles.card}>
                    <Text style={listStyles.cardTitle}>{item.name}</Text>
                    <Text style={listStyles.cardInfo}>Telefone: {item.phoneNumber}</Text>
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


