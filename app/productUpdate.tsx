import { router, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { findProductById, updateProduct } from '@/store/productSlice';
import Product from '@/types/product';
import ProductForm from '@/components/ProductForm';
import { Alert } from 'react-native';
import { RootState, AppDispatch } from '@/store/store';
import NotFoundItem from '@/components/NotFoundItem';

export default function ProductUpdateScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useLocalSearchParams();

  const product = useSelector((state: RootState) => findProductById(state, id?.toString() || ''));

  if (!product) {
    return <NotFoundItem />;
  }

  const handleSubmit = (updatedProduct: Product) => {
    dispatch(updateProduct(updatedProduct))
      .unwrap()
      .then(() => {
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
        router.replace({
          pathname: '/productDetails',
          params: { id: updatedProduct.id },
        });
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível atualizar o produto.');
      });
  };

  return (
    <ProductForm
      initialProduct={product}
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
