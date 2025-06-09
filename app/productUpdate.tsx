import { router, useLocalSearchParams } from 'expo-router';
import { useDispatch } from 'react-redux';
import { updateProduct } from '@/store/productSlice';
import Product from '@/types/product';
import ProductForm from '@/components/ProductForm';
import { Alert } from 'react-native';

export default function ProductUpdateScreen() {
  const dispatch = useDispatch();
  const productParams = useLocalSearchParams();

  const productToEdit: Product | null = productParams
    ? (JSON.parse(JSON.stringify(productParams)) as Product) 
    : null;

  const handleSubmit = (product: Product) => {
    dispatch(updateProduct(product));
    Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
    router.back();
  };

  return (
    <ProductForm
      initialProduct={productToEdit}
      onSubmit={handleSubmit}
      onCancel={() => {
        Alert.alert('Ação Cancelada', 'A edição do produto foi cancelada.');
        router.back();
      }}
      submitButtonText="ATUALIZAR"
      onAddSupplierPress={() => router.push('/supplierRegister')}
    />
  );
}