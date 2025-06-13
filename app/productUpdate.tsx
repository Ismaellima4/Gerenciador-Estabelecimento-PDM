import { router, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { findProductById, updateProduct } from '@/store/productSlice';
import Product from '@/types/product';
import ProductForm from '@/components/ProductForm';
import { Alert } from 'react-native';
import { RootState } from '@/store/store';
import NotFoundItem from '@/components/NotFoundItem';

export default function ProductUpdateScreen() {
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();

  const product = useSelector((state: RootState) => findProductById(state, id.toString()));

  if (!product) {
    return <NotFoundItem /> 
  }

  const handleSubmit = (product: Product) => {
    dispatch(updateProduct(product));
    Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
    router.replace({
      pathname: '/productDetails',
      params: {
        id: product.id,
      }
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