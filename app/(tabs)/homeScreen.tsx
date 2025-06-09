import { Search } from '@/components/Search';
import { RootState } from '@/store/store';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';


export default function HomeScreen() {

  const product = useSelector((state : RootState) => state.product.list)


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Produtos</Text>
        <Link href='/productsRegisterScreen' asChild>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addText}>ADICIONAR</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <Search />

      <FlatList
        data={product}
        keyExtractor={(item, index) => `${item.productName}-${index}`}
        renderItem={({ item }) => (
          <Link href={{
            pathname:'/productDetails',
            params:{
              productName: item.productName,
              description: item.description ?? '',
              productImage: item.productImage ?? '',
              price: item.price,
              category: JSON.stringify(item.category),
              amount:  String(item.amount),
              expirationDate: new Date(item.expirationDate).toDateString(),
              barCode: item.barCode,
              manufacturingDate: new Date(item.manufacturingDate).toDateString(),
              supplier: JSON.stringify(item.supplier)
            }
          }}  
          asChild>
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
                    <Image style={styles.image} source={{
                        uri: item.productImage
                      }
                    }/>
                  ) : (
                    <Ionicons name="image-outline" size={50} color="#ccc" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>}
      />
    </View>
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
    alignItems: 'center',
    marginBottom: 16,  
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
    fontWeight: 'bold',
    fontSize: 12,
  },
  mainBanner: {
    flex: 1,
    backgroundColor: '#ddd',
    height: 120,
    borderRadius: 20,
    marginRight: 8,
  },
  sideBanner: {
    width: 60,
    backgroundColor: '#ddd',
    borderRadius: 30,
  },
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
    height: '100%'
  },
   emptyText: { 
    textAlign: 'center',
    marginTop: 20, 
    color: '#999' 
  },
});
