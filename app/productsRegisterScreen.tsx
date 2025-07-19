import { router } from 'expo-router';
import ProductForm from '@/components/ProductForm';
import Product from '@/types/product';
import { Alert } from 'react-native';

export default function ProductFormScreen() {

  const handleSubmit = (product: Product) => {
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
