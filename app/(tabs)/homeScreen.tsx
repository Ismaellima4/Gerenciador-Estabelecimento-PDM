import { AddButton } from '@/components/AddButton';
import { Search } from '@/components/Search';
import { fetchProducts } from '@/store/productSlice';
import { AppDispatch, RootState } from '@/store/store';
import { listStyles } from '@/styles/listStyles';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


export default function HomeScreen() {
  
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: RootState) => state.product.list);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <View style={listStyles.container}>
      <View style={listStyles.header}>
        <Text style={listStyles.title}>Produtos</Text>
        <AddButton pathname='productsRegisterScreen' />
      </View>

      <Search />

      {loading && <Text style={{ textAlign: 'center', marginVertical: 20 }}>Carregando produtos...</Text>}
      {error && <Text style={{ color: 'red', textAlign: 'center', marginVertical: 20 }}>{error}</Text>}

      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.productName}-${index}`}
        renderItem={({ item }) => (
          <Link href={{
            pathname: 'products/productDetails',
            params: { id: item.id },
          }} asChild>
            <TouchableOpacity>
              <View style={styles.card}>
                <View style={styles.cardInfo}>
                  <View style={styles.avatar}><Text style={styles.avatarText}>F</Text></View>
                  <View>
                    <Text style={styles.productName}>{item.productName}</Text>
                    <Text style={styles.productCategory}>{item.category.name}</Text>
                  </View>
                </View>
                <View style={styles.imagePlaceholder}>
                  {item.productImage ? (
                    <Image
                      style={styles.image}
                      source={{ uri: item.productImage }}
                    />
                  ) : (
                    <Ionicons name="image-outline" size={50} color="#ccc" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          !loading && !error ? (
            <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  productList: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productName: {
    fontWeight: 'bold',
  },
  productCategory: {
    color: '#666',
    fontSize: 12,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
});
