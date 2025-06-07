import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Link, router } from 'expo-router';

export default function ListSuppliers() {
  const suppliers = useSelector((state: RootState) => state.supplier.list);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fornecedores</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/FornecedorForm')}
        >
          <Text style={styles.addText}>ADICIONAR</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={suppliers}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <Link href="/suppliersDetails" asChild>
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
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 24, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
  addButton: { borderWidth: 1, borderColor: '#000', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  addText: { fontSize: 12, fontWeight: 'bold' },
  card: { backgroundColor: '#e0e0e0', borderRadius: 10, padding: 12, marginBottom: 12 },
  cardTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  cardInfo: { fontSize: 12, color: '#444' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#999' },
});