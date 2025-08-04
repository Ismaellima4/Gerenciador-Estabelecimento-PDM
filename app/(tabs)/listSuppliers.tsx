import { AddButton } from '@/components/AddButton';
import { Search } from '@/components/Search';
import { fetchSuppliers } from '@/store/supplierSlice';
import { listStyles } from '@/styles/listStyles';
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

export default function ListSuppliers() {
  const dispatch = useDispatch<AppDispatch>();
  const suppliers = useSelector((state: RootState) => state.supplier.list);

   useEffect(() => {
      dispatch(fetchSuppliers())
    }, [dispatch])

  return (
    <SafeAreaView style={listStyles.container}>
      <View style={listStyles.header}>
        <Text style={listStyles.title}>Fornecedores</Text>
          <AddButton pathname='suppliers/supplierRegister'/>
      </View>

      <Search items={suppliers} searchBy='supplierName' getDetailsPath={() => 'suppliers/suppliersDetails'}/>

      <FlatList
        data={suppliers}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <Link href={{
            pathname: 'suppliers/suppliersDetails',
            params: {
                id: item.id,
            }
          }} asChild>
              <TouchableOpacity>
              <View style={listStyles.card}>
                <Text style={listStyles.cardTitle}>{item.supplierName}</Text>
                {item.phoneNumber && <Text style={listStyles.cardInfo}>Telefone: {item.phoneNumber}</Text>}
                {item.cnpj && <Text style={listStyles.cardInfo}>CNPJ: {item.cnpj}</Text>}
                {item.email && <Text style={listStyles.cardInfo}>Email: {item.email}</Text>}
              </View>
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={<Text style={listStyles.emptyText}>Nenhum fornecedor cadastrado.</Text>}
      />
    </SafeAreaView>
  );
}

