import FormActionButtons from '@/components/FormActionButton';
import ModalSelector from '@/components/ModalSelector';
import { createCategory, deleteCategory, fetchAllCategories } from '@/store/categorySlice';
import { createProduct, updateProduct } from '@/store/productSlice';
import { AppDispatch, RootState } from '@/store/store';
import { fetchSuppliers } from '@/store/supplierSlice';
import { registerStyles } from '@/styles/registerStyles';
import Category from '@/types/category';
import Product, { CreateProduct, UpdateProduct } from '@/types/product';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

interface ProductFormProps {
  initialProduct?: Product | null;
  onCancel: () => void;
  submitButtonText: string;
  onAddSupplierPress: () => void;
}

const ProductForm = ({
  initialProduct,
  onCancel,
  submitButtonText,
  onAddSupplierPress,
}: ProductFormProps) => {
  const [productName, setProductName] = useState(initialProduct?.productName || '');
  const [description, setDescription] = useState(initialProduct?.description || '');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(
    initialProduct?.productImage || null
  );
  const [supplier, setSupplier] = useState(initialProduct?.supplier?.supplierName || '');
  const [price, setPrice] = useState(initialProduct?.price?.toString() || '');
  const [category, setCategory] = useState(initialProduct?.category?.name || '');
  const [quantity, setQuantity] = useState(initialProduct?.amount?.toString() || '');

  const [expirationDateDisplay, setExpirationDateDisplay] = useState( 
    initialProduct?.expirationDate
      ? moment(initialProduct.expirationDate).format('DD/MM/YYYY')
      : ''
  );
  const [expirationDateValue, setExpirationDateValue] = useState( 
    initialProduct?.expirationDate ? new Date(initialProduct.expirationDate) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [barcode, setBarcode] = useState(initialProduct?.barCode || '');

  const [image, setImage] = useState<ImagePickerAsset | undefined>(undefined);

  const [isSupplierModalVisible, setSupplierModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  const suppliers = useSelector((state: RootState) => state.supplier.list);
  const categories = useSelector((state: RootState) => state.category.list);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchSuppliers());
  }, [dispatch]);

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
      const picked = result.assets[0];
       setImage(picked);
       setSelectedImageUri(picked.uri);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || expirationDateValue;
    setShowDatePicker(Platform.OS === 'ios'); // No iOS, o picker não fecha automaticamente
    setExpirationDateValue(currentDate);
    setExpirationDateDisplay(moment(currentDate).format('DD/MM/YYYY'));
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = async () => {
  if (!productName || !supplier || !category || !price || !quantity) {
    Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
    return;
  }

  const selectedSupplier = suppliers.find(s => s.supplierName === supplier);
  const selectedCategory = categories.find(c => c.name === category);

  if (!selectedSupplier || !selectedCategory) {
    Alert.alert('Erro', 'Fornecedor ou categoria inválidos.');
    return;
  }

  let expirationDateISO: string;
  try {
    expirationDateISO = expirationDateValue.toISOString();
  } catch {
    Alert.alert('Erro', 'Data de validade inválida.');
    return;
  }

  let manufacturingDateISO: string;
  try {
    manufacturingDateISO = initialProduct?.manufacturingDate
      ? new Date(initialProduct.manufacturingDate).toISOString()
      : new Date().toISOString();
  } catch {
    manufacturingDateISO = new Date().toISOString();
  }

  const productData = {
    productName,
    description,
    productImage: selectedImageUri || '',
    price: parseFloat(price),
    category: selectedCategory.id,
    amount: parseInt(quantity),
    expirationDate: expirationDateISO,
    barCode: barcode.trim() === '' ? '' : barcode,
    manufacturingDate: manufacturingDateISO,
    supplier: selectedSupplier.id,
    file: image,
  };

  if (initialProduct?.id) {
    const updatedProduct: UpdateProduct = {
      id: initialProduct.id,
    };

    if (productName && productName !== initialProduct.productName) {
      updatedProduct.productName = productName;
    }
    if (description && description !== initialProduct.description) {
      updatedProduct.description = description;
    }
    if (price && parseFloat(price) !== initialProduct.price) {
      updatedProduct.price = parseFloat(price);
    }
    if (selectedCategory.id !== initialProduct.category.id) {
      updatedProduct.category = selectedCategory.id;
    }
    if (quantity && parseInt(quantity) !== initialProduct.amount) {
      updatedProduct.amount = parseInt(quantity);
    }
    if (expirationDateISO !== new Date(initialProduct.expirationDate).toISOString()) {
      updatedProduct.expirationDate = expirationDateISO;
    }
    if (barcode && barcode !== initialProduct.barCode) {
      updatedProduct.barCode = barcode;
    }
    if (selectedSupplier.id !== initialProduct.supplier.id) {
      updatedProduct.supplier = selectedSupplier.id;
    }

    try {
      await dispatch(updateProduct(updatedProduct)).unwrap();
      Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      router.back();
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar o produto.');
    }
  } else {
    const createProductData: CreateProduct = {
      ...productData,
    };

    try {
      await dispatch(createProduct(createProductData)).unwrap();
      router.back();
    } catch {
      Alert.alert('Erro', 'Não foi possível criar o produto.');
    }
  }
};


  const handleSelectSupplier = (selectedSupplier: string) => {
    setSupplier(selectedSupplier);
    setSupplierModalVisible(false);
  };

  const handleSelectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setCategoryModalVisible(false);
  };

  const handleAddCategorySubmit = async (newCategory: string) => {
    const category: Omit<Category, 'id'> = {
      name: newCategory,
    };
    try {
      await dispatch(createCategory(category)).unwrap();
      handleSelectCategory(newCategory);
      setCategoryModalVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCategory = async (categoryNameToDelete: string) => {
    const categoryToDelete = categories.find(
      (c) => c.name.toLowerCase() === categoryNameToDelete.toLowerCase()
    );

    if (!categoryToDelete) return;

    try {
      await dispatch(deleteCategory(categoryToDelete.id)).unwrap();

      if (categoryToDelete.name === category) {
        setCategory('');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir a categoria.');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <SafeAreaView style={registerStyles.safeArea}>
        <Pressable onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={registerStyles.container}>
            <Text style={registerStyles.label}>Nome do produto <Text style={registerStyles.required}>*</Text></Text>
            <TextInput
              style={registerStyles.input}
              placeholder="Digite o nome do produto"
              placeholderTextColor="#999"
              value={productName}
              onChangeText={setProductName}
            />

            <Text style={registerStyles.label}>Descrição</Text>
            <TextInput
              style={styles.textArea}
              multiline
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
            />

            <Text style={registerStyles.label}>Add. Imagens</Text>
            <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
              {selectedImageUri ? (
                <Image source={{ uri: selectedImageUri }} style={styles.uploadedImage} />
              ) : (
                <AntDesign name="plus" size={30} color="#666" />
              )}
            </TouchableOpacity>

            <Text style={registerStyles.label}>Fornecedor</Text>
            <TouchableOpacity style={styles.dropdown} onPress={() => setSupplierModalVisible(true)}>
              <TextInput
                style={styles.dropdownTextInput}
                placeholder="Selecione o fornecedor"
                placeholderTextColor="#999"
                editable={false}
                value={supplier}
              />
              <AntDesign name="caretdown" size={14} color="#666" />
            </TouchableOpacity>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={registerStyles.label}>Preço</Text>
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
                <Text style={registerStyles.label}>Categoria</Text>
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
                <Text style={registerStyles.label}>Qtd. em Estoque</Text>
                <TextInput
                  style={registerStyles.input}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                  value={quantity}
                  onChangeText={setQuantity}
                />
              </View>
              <View style={styles.column}>
                <Text style={registerStyles.label}>Data de Validade</Text>
                <TouchableOpacity onPress={showDatePickerModal}>
                  <TextInput
                    style={registerStyles.input}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor="#999"
                    value={expirationDateDisplay} 
                    editable={false}
                    pointerEvents="none"
                  />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={expirationDateValue} 
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>
            </View>

            <Text style={registerStyles.label}>Código de Barras</Text>
            <View style={styles.barcodeInputContainer}>
              <TextInput
                style={styles.barcodeInput}
                placeholderTextColor="#999"
                value={barcode}
                onChangeText={setBarcode}
                editable={!initialProduct}
              />
              <MaterialIcons name="qr-code-scanner" size={24} color="#666" style={styles.barcodeIcon} />
            </View>

            <FormActionButtons
              onSave={handleSubmit}
              onCancel={onCancel}
              saveText={submitButtonText}
            />
          </ScrollView>
        </Pressable>

        <ModalSelector
          visible={isSupplierModalVisible}
          onClose={() => setSupplierModalVisible(false)}
          options={suppliers.map(supplier => supplier.supplierName)}
          onSelect={handleSelectSupplier}
          title="Selecione um Fornecedor"
          showAddInput={false}
          onAddPress={onAddSupplierPress}
        />

        <ModalSelector
          visible={isCategoryModalVisible}
          onClose={() => setCategoryModalVisible(false)}
          options={categories.map(category => category.name)}
          onSelect={handleSelectCategory}
          title="Gerenciar Categorias"
          showAddInput={true}
          onAddSubmit={handleAddCategorySubmit}
          onDeleteItem={handleDeleteCategory}
          placeholder="Nome da nova categoria"
          selectText="Selecione uma categoria:"
          addInputLabel="Adicione uma nova categoria:"
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
});

export default ProductForm;