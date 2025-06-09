import FormActionButtons from '@/components/FormActionButton';
import ModalSelector from '@/components/ModalSelector';
import { addCategory } from '@/store/categorySlice';
import { RootState } from '@/store/store';
import Category from '@/types/category';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'; // Importe o FileSystem
import { router } from 'expo-router';
import React, { useState } from 'react';
import { addProduct } from '@/store/productSlice';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Product from '@/types/product';


export default function ProductFormScreen() {

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null); // Armazenará a URI persistente
  const [supplier, setSupplier] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [barcode, setBarcode] = useState('');

  const dispatch = useDispatch();


  const saveProduct = () => {
    if (!productName || !supplier || !category || !price || !quantity) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const selectedSupplier = suppliers.find(s => s.name === supplier);
    const selectedCategory = categories.find(c => c.name === category);

    if (!selectedSupplier || !selectedCategory) {
      Alert.alert('Erro', 'Fornecedor ou categoria inválidos.');
      return;
    }

    const newProduct: Product = {
      productName,
      description,
      productImage: selectedImageUri || undefined, // Agora selectedImageUri será a URI persistente
      price: parseFloat(price),
      category: selectedCategory,
      amount: parseInt(quantity),
      expirationDate: new Date(expirationDate),
      barCode: barcode,
      manufacturingDate: new Date(),
      supplier: selectedSupplier,
    };

    dispatch(addProduct(newProduct));
    Alert.alert('Sucesso', 'Produto salvo com sucesso!');
    router.back();
  };


  const [isSupplierModalVisible, setSupplierModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  const suppliers = useSelector((state: RootState) => state.supplier.list)
  const categories = useSelector((state: RootState) => state.category.list)


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
      const originalUri = result.assets[0].uri;
      const fileName = originalUri.split('/').pop();
      const productImagesDir = `${FileSystem.documentDirectory}product_images/`;

      // Verifica se o diretório existe, se não, cria
      const dirInfo = await FileSystem.getInfoAsync(productImagesDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(productImagesDir, { intermediates: true });
      }

      // Define o novo caminho para a imagem persistente
      const newUri = `${productImagesDir}${fileName}`;

      try {
        // Copia a imagem original para o novo caminho persistente
        await FileSystem.copyAsync({
          from: originalUri,
          to: newUri,
        });
        setSelectedImageUri(newUri); // Salva a URI da imagem copiada
        console.log('Imagem salva em:', newUri);
      } catch (error) {
        console.error('Erro ao copiar imagem:', error);
        Alert.alert('Erro', 'Não foi possível salvar a imagem.');
        setSelectedImageUri(null); // Limpa a URI em caso de erro
      }
    }
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
    const category: Category = {
        name: newCategory,
    }
    dispatch(addCategory(category))
    handleSelectCategory(newCategory)
    setCategoryModalVisible(false);
  };


  return (
     <KeyboardAvoidingView
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>

          <Text style={styles.label}>Nome do produto <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do produto"
            placeholderTextColor="#999"
            value={productName}
            onChangeText={setProductName}
          />


          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.textArea}
            multiline
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
          />


          <Text style={styles.label}>Add. Imagens</Text>
          <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
            {selectedImageUri ? (
              <Image source={{ uri: selectedImageUri }} style={styles.uploadedImage} />
            ) : (
              <AntDesign name="plus" size={30} color="#666" />
            )}
          </TouchableOpacity>


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

          <FormActionButtons  onSave={saveProduct} onCancel={handleCancel} />
        </ScrollView>

        <ModalSelector
          visible={isSupplierModalVisible}
          onClose={() => setSupplierModalVisible(false)}
          options={suppliers.map(supplier => supplier.name)}
          onSelect={handleSelectSupplier}
          title="Selecione um Fornecedor"
          showAddInput={false}
          onAddPress={handleAddSupplierPress}
        />

        <ModalSelector
          visible={isCategoryModalVisible}
          onClose={() => setCategoryModalVisible(false)}
          options={categories.map(category => category.name)}
          onSelect={handleSelectCategory}
          title="Gerenciar Categorias"
          showAddInput={true}
          onAddSubmit={handleAddCategorySubmit}
          placeholder="Nome da nova categoria"
          selectText="Selecione uma categoria:"
          addInputLabel="Adicione uma nova categoria:"
        />
        </SafeAreaView>
    </KeyboardAvoidingView>
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