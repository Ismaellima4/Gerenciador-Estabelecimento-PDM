import { router, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { findProductById } from '@/store/productSlice';
import Product from '@/types/product';
import ProductForm from '@/components/ProductForm';
import { Alert } from 'react-native';
import { RootState } from '@/store/store';
import NotFoundItem from '@/components/NotFoundItem';

export default function ProductUpdateScreen() {
  const { id } = useLocalSearchParams();

  const product: Product | undefined = useSelector((state: RootState) => findProductById(state, id?.toString() || ''));

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
