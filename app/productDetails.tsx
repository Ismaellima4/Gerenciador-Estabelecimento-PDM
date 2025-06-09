import { deleteProduct } from '@/store/productSlice';
import Category from '@/types/category';
import Product from '@/types/product';
import Supplier from '@/types/supplier';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

export default function ProductDetailScreen() {

  const dispatch = useDispatch();
  const ProductParams = useLocalSearchParams();

  const [productName] = useState(String(ProductParams.productName));
  const [description] = useState(String(ProductParams.description));
  const [productImage] = useState(String(ProductParams.productImage));
  const [price] = useState(String(ProductParams.price));
  const [category] = useState(JSON.parse(String(ProductParams.category)));
  const [amount] =  useState(String(ProductParams.amount));
  const [expirationDate] =  useState(String(ProductParams.expirationDate));
  const [barCode] =  useState(String(ProductParams.barCode));
  const [manufacturingDate] = useState(String(ProductParams.manufacturingDate));
  const [supplier] = useState(JSON.parse(String(ProductParams.supplier)))

    const handleDelete = () => {
      const parsedProduct: Product = {
        productName,
        description,
        productImage,
        price: parseFloat(price),
        category: JSON.parse(String(ProductParams.category)) as Category,
        amount: parseInt(amount),
        expirationDate: new Date(expirationDate),
        barCode,
        manufacturingDate: new Date(manufacturingDate),
        supplier: JSON.parse(String(ProductParams.supplier)) as Supplier,
      };

      dispatch(deleteProduct(parsedProduct));
      Alert.alert('Removido', 'Produto excluído com sucesso!');
      router.back();
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
          <Text style={styles.dateText}>{expirationDate}</Text>
          <View style={styles.productNameRow}>
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.quantity}>{amount}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.categoryRow}>
            <Text style={styles.categoryText}>{category.name}</Text>
            <Text style={styles.price}>R$ {price}</Text>
          </View>
        </View>

        <Link href={{
          pathname: '/suppliersDetails',
          params: {
            name: supplier.name,
            phoneNumber: supplier.phoneNumber,
            cnpj: supplier.cnpj ?? '',
            email: supplier.email ?? '',
            additionalInformation: supplier.additionalInformation ?? ''
          }
        }} asChild>
          <TouchableOpacity>
            <View style={styles.supplierContainer}>
              <View style={styles.supplierInitialCircle}>
                <Text style={styles.supplierInitial}>F</Text>
              </View>
              <Text style={styles.supplierName}>{supplier.name}</Text>
            </View>
          </TouchableOpacity>
        </Link>

        <View style={styles.barcodePlaceholder}>
          <Text style={styles.barcodeText}>{barCode}</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Link href={{
          pathname: '/productUpdate',
          params: {
            productName,
            description,
            productImage,
            price,
            category: category.name,
            amount,
            expirationDate,
            barCode,
            manufacturingDate,
            supplier,
          }
        }}
        asChild
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>EDITAR</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>DELETAR</Text>
         </TouchableOpacity>
      </View>
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
  buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
  width: '85%',
},
button: {
  backgroundColor: 'black',
  margin: 17,
  paddingVertical: 15,
  paddingHorizontal: 30,
  borderRadius: 10,
  width: '48%', 
  alignItems: 'center',
},
buttonText: {
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
},
image: {
    width: '100%',
    height: '100%',
  },
});