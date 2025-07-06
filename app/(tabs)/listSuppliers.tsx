import { AddButton } from '@/components/AddButton';
import { Search } from '@/components/Search';
import { listStyles } from '@/styles/listStyles';
import { Link } from 'expo-router';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function ListSuppliers() {
  const suppliers = useSelector((state: RootState) => state.supplier.list);

  return (
    <SafeAreaView style={listStyles.container}>
      <View style={listStyles.header}>
        <Text style={listStyles.title}>Fornecedores</Text>
          <AddButton pathname='supplierRegister'/>
      </View>

      <Search />

      <FlatList
        data={suppliers}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <Link href={{
            pathname: '/suppliersDetails',
            params: {
                id: item.id,
            }
          }} asChild>
              <TouchableOpacity>
              <View style={listStyles.card}>
                <Text style={listStyles.cardTitle}>{item.supplierName}</Text>
                <Text style={listStyles.cardInfo}>Telefone: {item.phoneNumber}</Text>
                {item.cnpj && <Text style={listStyles.cardInfo}>CNPJ: {item.cnpj}</Text>}
                {item.email && <Text style={listStyles.cardInfo}>Email: {item.email}</Text>}
                {item.additionalInformation && (
                  <Text style={listStyles.cardInfo}>
                    Informações adicionais: {item.additionalInformation}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={<Text style={listStyles.emptyText}>Nenhum fornecedor cadastrado.</Text>}
      />
    </SafeAreaView>
  );
}
