import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="image-outline" size={80} color="#ccc" />
        </View>

        <View style={styles.productDetails}>
          <Text style={styles.dateText}>Fab dd:mm:aaaa - Val dd:mm:aaaa</Text>
          <View style={styles.productNameRow}>
            <Text style={styles.productName}>Nome do produto</Text>
            <Text style={styles.quantity}>4</Text>
          </View>
          <Text style={styles.description}>Descrição</Text>
          <View style={styles.categoryRow}>
            <TouchableOpacity style={styles.categoryDropdown}>
              <Ionicons name="chevron-down" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.categoryText}>categoria</Text>
            <Text style={styles.price}>$0</Text>
          </View>
        </View>

        <View style={styles.supplierContainer}>
          <View style={styles.supplierInitialCircle}>
            <Text style={styles.supplierInitial}>F</Text>
          </View>
          <Text style={styles.supplierName}>Nome do fornecedor</Text>
        </View>

        <View style={styles.barcodePlaceholder}>
          <Text style={styles.barcodeText}>[ BARCODE ]</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerRightPlaceholder: {
    width: 24,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  productDetails: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  productNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    color: '#555',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDropdown: {
    paddingRight: 5,
  },
  categoryText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  supplierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  supplierInitialCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  supplierInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  supplierName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  barcodePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  barcodeText: {
    fontSize: 16,
    color: '#888',
  },
  editButton: {
    backgroundColor: 'black',
    padding: 15,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});