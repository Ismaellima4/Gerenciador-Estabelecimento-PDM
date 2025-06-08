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
import { Search } from '@/components/Search';

export default function ListSuppliers() {
  const suppliers = useSelector((state: RootState) => state.supplier.list);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fornecedores</Text>
        <Link href='/supplierRegister' asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addText}>ADICIONAR</Text>
        </TouchableOpacity>
        </Link>
      </View>

      <Search />

      <FlatList
        data={suppliers}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <Link href={{
            pathname: '/suppliersDetails',
            params: {
              name: item.name,
              phoneNumber: item.phoneNumber,
              cnpj: item.cnpj,
              email: item.email,
              additionalInformation: item.additionalInformation
            }
          }} asChild>
              <TouchableOpacity>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
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
  container: { 
    flex: 1, 
    paddingHorizontal: 16, 
    paddingTop: 24, 
    backgroundColor: '#fff' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 16, 
    alignItems: 'center' 
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
    fontSize: 12, 
    fontWeight: 'bold' 
  },
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