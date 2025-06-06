import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  supplier  from '@/types/supplier';
import { router, useFocusEffect } from 'expo-router';

const STORAGE_KEY = '@suppliers_list';

export default function ListSuppliers() {
  const [suppliers, setSuppliers] = useState<supplier[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadSuppliers();
    }, [])
  );

  const loadSuppliers = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      setSuppliers(data ? JSON.parse(data) : []);
    } catch (error) {
      console.error('Erro ao carregar fornecedores:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fornecedores</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/(tabs)/FornecedorForm')}
        >
          <Text style={styles.addText}>ADICIONAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Buscar" placeholderTextColor="#888" />
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color="#888" style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={suppliers}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardInfo}>Telefone: {item.phoneNumber}</Text>
            {item.cnpj && <Text style={styles.cardInfo}>CNPJ: {item.cnpj}</Text>}
            {item.email && <Text style={styles.cardInfo}>Email: {item.email}</Text>}
            {item.additionalInformation && <Text style={styles.cardInfo}>Informações adicionais: {item.additionalInformation}</Text>}
          </View>
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
    backgroundColor: '#fff',
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
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  menuIcon: {
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#999',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  cardInfo: {
    fontSize: 12,
    color: '#444',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
});
