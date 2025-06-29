import { AddButton } from '@/components/AddButton';
import { Search } from '@/components/Search';
import { listStyles } from '@/styles/listStyles';
import { Link } from 'expo-router';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
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
        <Link href='/supplierRegister' asChild>
          <AddButton/>
        </Link>
      </View>

      <Search />

      <FlatList
        data={suppliers}
        keyExtractor={(item, index) => `${item.supplierName}-${index}`}
        renderItem={({ item }) => (
          <Link href={{
            pathname: '/suppliersDetails',
            params: {
                id: item.id,
            }
          }} asChild>
              <TouchableOpacity>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.supplierName}</Text>
                <Text style={styles.cardInfo}>Telefone: {item.phoneNumber}</Text>
                {item.cnpj && <Text style={styles.cardInfo}>CNPJ: {item.cnpj}</Text>}
                {item.email && <Text style={styles.cardInfo}>Email: {item.email}</Text>}
                {item.additionalInformation && (
                  <Text style={styles.cardInfo}>
                    Informações adicionais: {item.additionalInformation}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum fornecedor cadastrado.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#e0e0e0', 
    borderRadius: 10, 
    padding: 12, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#000'
  },
  cardTitle: { 
    fontWeight: 'bold', 
    fontSize: 20, 
    marginBottom: 4 
  },
  cardInfo: { 
    fontSize: 14, 
    color: '#444' 
  },
  emptyText: { 
    textAlign: 'center',
    marginTop: 20, 
    color: '#999' 
  },
});