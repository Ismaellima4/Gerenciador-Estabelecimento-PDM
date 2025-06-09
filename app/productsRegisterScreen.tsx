import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/store/productSlice';
import ProductForm from '@/components/ProductForm';
import Product from '@/types/product';
import { Alert } from 'react-native';

export default function ProductFormScreen() {
  const dispatch = useDispatch();

  const handleSubmit = (product: Product) => {
    dispatch(addProduct(product));
    Alert.alert('Sucesso', 'Produto salvo com sucesso!');
    router.back();
  };

  return (
    <ProductForm
      onSubmit={handleSubmit}
      onCancel={() => {
        Alert.alert('Ação Cancelada', 'O formulário foi cancelado.');
        router.back();
      }}
      submitButtonText="SALVAR"
      onAddSupplierPress={() => router.push('/supplierRegister')}
    />
  );
}