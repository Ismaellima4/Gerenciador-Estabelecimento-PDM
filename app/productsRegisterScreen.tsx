import FormActionButtons from '@/components/FormActionButton';
import ModalSelector from '@/components/ModalSelector';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dummy screen for adding new items - you would replace this with your actual screens
const getSuppliersFromStorage = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        'Fornecedor A', 'Fornecedor B', 'Fornecedor C', 'Fornecedor D',
        'Fornecedor E', 'Fornecedor F', 'Fornecedor G', 'Fornecedor H',
        'Fornecedor I', 'Fornecedor J', 'Fornecedor K', 'Fornecedor L',
        'Fornecedor M', 'Fornecedor N', 'Fornecedor O', 'Fornecedor P',
        'Fornecedor Q', 'Fornecedor R', 'Fornecedor S', 'Fornecedor T',
        'Novo Fornecedor Adicionado 1',
        'Novo Fornecedor Adicionado 2',
      ]);
    }, 100);
  });
};

const getCategoriesFromStorage = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        'Eletrônicos', 'Roupas', 'Alimentos', 'Livros', 'Decoração',
        'Ferramentas', 'Brinquedos', 'Esportes', 'Saúde e Beleza',
        'Automotivo', 'Pet Shop', 'Jardim', 'Móveis', 'Utensílios Domésticos',
        'Informática', 'Construção', 'Artesanato', 'Música', 'Filmes', 'Jogos',
        'Nova Categoria Adicionada 1',
        'Nova Categoria Adicionada 2',
      ]);
    }, 100);
  });
};


export default function ProductFormScreen() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [supplier, setSupplier] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [barcode, setBarcode] = useState('');

  const [isSupplierModalVisible, setSupplierModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  const [suppliers, setSuppliers] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const loadedSuppliers = await getSuppliersFromStorage() as string[];
        const loadedCategories = await getCategoriesFromStorage() as string[];
        setSuppliers(loadedSuppliers);
        setCategories(loadedCategories);
      };

      loadData();
    }, [])
  );

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Por favor, conceda permissão para acessar a galeria de fotos para escolher imagens.'
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImageUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    console.log('Product Name:', productName);
    console.log('Description:', description);
    console.log('Selected Image URI:', selectedImageUri);
    console.log('Supplier:', supplier);
    console.log('Price:', price);
    console.log('Category:', category);
    console.log('Quantity:', quantity);
    console.log('Expiration Date:', expirationDate);
    console.log('Barcode:', barcode);
    Alert.alert('Formulário Salvo', 'Os dados do produto foram registrados!');
  };

  const handleCancel = () => {
    Alert.alert('Ação Cancelada', 'O formulário foi cancelado.');
    setProductName('');
    setDescription('');
    setSelectedImageUri(null);
    setSupplier('');
    setPrice('');
    setCategory('');
    setQuantity('');
    setExpirationDate('');
    setBarcode('');
  };

  const handleSelectSupplier = (selectedSupplier: string) => {
    setSupplier(selectedSupplier);
    setSupplierModalVisible(false);
  };

  const handleAddSupplierPress = () => {
    setSupplierModalVisible(false);
    router.push('/supplierRegister')
  };

  const handleSelectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setCategoryModalVisible(false);
  };

  const handleAddCategorySubmit = (newCategory: string) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
    }
    setCategoryModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Product Name */}
        <Text style={styles.label}>Nome do produto <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do produto"
          placeholderTextColor="#999"
          value={productName}
          onChangeText={setProductName}
        />

        {/* Description */}
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
        />

        {/* Add Images */}
        <Text style={styles.label}>Add. Imagens</Text>
        <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
          {selectedImageUri ? (
            <Image source={{ uri: selectedImageUri }} style={styles.uploadedImage} />
          ) : (
            <AntDesign name="plus" size={30} color="#666" />
          )}
        </TouchableOpacity>

        {/* Fornecedor (Supplier) */}
        <Text style={styles.label}>Fornecedor</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setSupplierModalVisible(true)}>
          <TextInput
            style={styles.dropdownTextInput}
            placeholder="Selecione o fornecedor"
            placeholderTextColor="#999"
            value={supplier}
            editable={false}
          />
          <AntDesign name="caretdown" size={14} color="#666" />
        </TouchableOpacity>

        {/* Price and Category */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Preço</Text>
            <View style={styles.priceInputContainer}>
              <Text style={styles.currency}>R$</Text>
              <TextInput
                style={styles.priceInput}
                keyboardType="numeric"
                placeholderTextColor="#999"
                value={price}
                onChangeText={setPrice}
              />
            </View>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Categoria</Text>
            <TouchableOpacity style={styles.dropdown} onPress={() => setCategoryModalVisible(true)}>
              <TextInput
                style={styles.dropdownTextInput}
                placeholder="Selecione a categoria"
                placeholderTextColor="#999"
                value={category}
                editable={false}
              />
              <AntDesign name="caretdown" size={14} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Qtd. em Estoque (Quantity in Stock) and Data de Validade (Expiration Date) */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Qtd. em Estoque</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholderTextColor="#999"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Data de Validade</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              placeholderTextColor="#999"
              value={expirationDate}
              onChangeText={setExpirationDate}
            />
          </View>
        </View>

        {/* Código de Barras (Barcode) */}
        <Text style={styles.label}>Código de Barras</Text>
        <View style={styles.barcodeInputContainer}>
          <TextInput
            style={styles.barcodeInput}
            placeholderTextColor="#999"
            value={barcode}
            onChangeText={setBarcode}
          />
          <MaterialIcons name="qr-code-scanner" size={24} color="#666" style={styles.barcodeIcon} />
        </View>

        <FormActionButtons onSave={handleSave} onCancel={handleCancel} />
      </ScrollView>

      {/* Supplier Modal (Navigation button, all black buttons) */}
      <ModalSelector
        visible={isSupplierModalVisible}
        onClose={() => setSupplierModalVisible(false)}
        options={suppliers}
        onSelect={handleSelectSupplier}
        title="Selecione um Fornecedor"
        showAddInput={false}
        onAddPress={handleAddSupplierPress}
      />

      {/* Category Modal (In-modal input, labels, all black buttons) */}
      <ModalSelector
        visible={isCategoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        options={categories}
        onSelect={handleSelectCategory}
        title="Gerenciar Categorias" // Changed title for clarity
        showAddInput={true}
        onAddSubmit={handleAddCategorySubmit}
        placeholder="Nome da nova categoria"
        selectText="Selecione uma categoria:" // New label for selection list
        addInputLabel="Adicione uma nova categoria:" // New label for add input
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  imageUpload: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 8,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  dropdownTextInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 12,
    backgroundColor: '#fff',
  },
  currency: {
    fontSize: 16,
    marginRight: 5,
    color: '#333',
  },
  priceInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  barcodeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  barcodeInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  barcodeIcon: {
    padding: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});