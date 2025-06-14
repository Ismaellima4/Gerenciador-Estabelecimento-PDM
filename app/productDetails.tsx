import FormActionButtons from '@/components/FormActionButton';
import { deleteProductById, findProductById } from '@/store/productSlice'; 
import { RootState } from '@/store/store';
import { Ionicons } from '@expo/vector-icons';
import { Link, router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductDetailScreen() {
  const dispatch = useDispatch();

  const { id } = useLocalSearchParams();

  const product = useSelector((state: RootState) =>
    findProductById(state, String(id))
  );

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centeredMessage}>
          <Text style={styles.errorMessage}>Produto não encontrado.</Text>
            <TouchableOpacity style={styles.backButton} onPress={router.back}>
              <Text style={styles.backButtonText}>Voltar para a lista</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const {
    productName,
    description,
    productImage,
    price,
    category,
    amount,
    expirationDate,
    barCode,
    supplier,
  } = product;

  const handleDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir o produto "${productName}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            dispatch(deleteProductById({ id: product.id }));
            Alert.alert('Removido', 'Produto excluído com sucesso!');
            router.back();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imagePlaceholder}>
          {productImage ? (
            <Image
              source={{ uri: productImage }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Ionicons name="image-outline" size={50} color="#ccc" />
          )}
        </View>

        <View style={styles.productDetails}>
          <Text style={styles.dateText}>
            Data de Validade: {expirationDate instanceof Date ? expirationDate.toLocaleDateString() : String(expirationDate)}
          </Text>
          <View style={styles.productNameRow}>
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.quantity}>{amount} un.</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.categoryRow}>
            <Text style={styles.categoryText}>{category.name}</Text>
            <Text style={styles.price}>R$ {price.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>

        <Link href={{
          pathname: '/suppliersDetails',
          params: {
            id: supplier.id
          }
        }} asChild>
          <TouchableOpacity>
            <View style={styles.supplierContainer}>
              <View style={styles.supplierInitialCircle}>
                <Text style={styles.supplierInitial}>{supplier.supplierName ? supplier.supplierName.charAt(0).toUpperCase() : '?'}</Text>
              </View>
              <Text style={styles.supplierName}>{supplier.supplierName}</Text>
            </View>
          </TouchableOpacity>
        </Link>

        <View style={styles.barcodePlaceholder}>
          <Text style={styles.barcodeText}>Código de Barras: {barCode}</Text>
        </View>
      </ScrollView>

      <FormActionButtons
        onSave={() => router.push({ 
          pathname: '/productUpdate', 
          params: { id: product.id } 
        })}
        onCancel={handleDelete}
        saveText="EDITAR"
        cancelText="DELETAR"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
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
  image: {
    width: '100%',
    height: '100%',
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20, // Adicionei um espaçamento
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center'
  },
});