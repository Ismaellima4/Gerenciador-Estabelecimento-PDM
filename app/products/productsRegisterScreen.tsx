import { router } from 'expo-router';
import ProductForm from '@/components/ProductForm';
import { Alert } from 'react-native';

export default function ProductFormScreen() {

  return (
    <ProductForm
      onCancel={() => {
        Alert.alert('Ação Cancelada', 'O formulário foi cancelado.');
        router.back();
      }}
      submitButtonText="SALVAR"
      onAddSupplierPress={() => router.push('suppliers/supplierRegister')}
    />
  );
}
