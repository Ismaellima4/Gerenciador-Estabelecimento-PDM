import { router, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { findProductById } from '@/store/productSlice';
import ProductForm from '@/components/ProductForm';
import { Alert } from 'react-native';
import { RootState } from '@/store/store';
import NotFoundItem from '@/components/NotFoundItem';

export default function ProductUpdateScreen() {
  const { id } = useLocalSearchParams();

  const product  = useSelector((state: RootState) => findProductById(state, String(id)));

  if (!product) {
    return <NotFoundItem />;
  }

  return (
    <ProductForm
      initialProduct={product}
      onCancel={() => {
        Alert.alert('Ação Cancelada', 'A edição do produto foi cancelada.');
        router.back();
      }}
      submitButtonText="ATUALIZAR"
      onAddSupplierPress={() => router.push('suppliers/supplierRegister')}
    />
  );
}
