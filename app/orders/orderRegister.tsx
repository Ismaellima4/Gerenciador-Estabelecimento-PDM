import { registerStyles } from '@/styles/registerStyles';
import { AntDesign, Feather } from '@expo/vector-icons';
import React, {useState } from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import GreenButton from '@/components/ButtonComp';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import Product from '@/types/product';
import { addOrderItem, deleteOrderItemById, resetOrderItems } from '@/store/orderItemSlice';
import { useRouter } from 'expo-router';
import { CreateOrderDto } from '@/types/order';
import { createOrder } from '@/store/orderSlice';

export default function OrderRegistration() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.list);
  const orderItems = useSelector((state: RootState) => state.orderItem.list);

  const [productModalVisible, setProductModalVisible] = useState(false);
  const [itemsModalVisible, setItemsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<string>('');


  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editedQty, setEditedQty] = useState<string>('');

  const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleAddProduct = () => {
    if (!selectedProduct) return Alert.alert('Selecione um produto');
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) return Alert.alert('Quantidade inválida');

    dispatch(addOrderItem({ product: selectedProduct, quantity: qty, order: undefined } as any));
    setQuantity('');
    setSelectedProduct(null);
  };

  const handleRemoveItem = (id: string) => dispatch(deleteOrderItemById({ id }));

  const router = useRouter();


  const handleFinishOrderAndGoToPayment = async () => {
    if (orderItems.length === 0) {
    return Alert.alert('Erro', 'Adicione pelo menos um item antes de finalizar o pedido.');
    }

    const payload: CreateOrderDto = {
      orderItems: orderItems.map(item => ({
        productID: item.product.id,
        quantity: item.quantity,
      })),
    };

    try {
      const resultAction = await dispatch(createOrder(payload));
      if (createOrder.fulfilled.match(resultAction)) {
        const newOrder = resultAction.payload;
        router.push({
          pathname: 'payments/paymentRegister',
          params: { orderId: newOrder.id },
        });

        dispatch(resetOrderItems());

        setQuantity('');
        setSelectedProduct(null);
        setEditingItemId(null);
        setEditedQty('')
        
      } else {
        Alert.alert('Erro', 'Falha ao salvar pedido.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro inesperado', 'Tente novamente.');
    }
  };
  

  const handleFinishOrderNotPay = async () => {
    if (orderItems.length === 0) {
    return Alert.alert('Erro', 'Adicione pelo menos um item antes de finalizar o pedido.');
    }

    const payload: CreateOrderDto = {
      orderItems: orderItems.map(item => ({
        productID: item.product.id,
        quantity: item.quantity,
      })),
    };

    try {
      const resultAction = await dispatch(createOrder(payload));
      if (createOrder.fulfilled.match(resultAction)) {
        dispatch(resetOrderItems());

        setQuantity('');
        setSelectedProduct(null);
        setEditingItemId(null);
        setEditedQty('');

        Alert.alert('Sucesso', 'Pedido salvo com sucesso.');
        router.back();
      } else {
        Alert.alert('Erro', 'Falha ao salvar pedido.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro inesperado', 'Tente novamente.');
    }
  };

  const handleSaveEditQty = (itemId: string, product: Product) => {
    const qty = parseInt(editedQty, 10);
    if (isNaN(qty) || qty <= 0) return Alert.alert('Quantidade inválida');

    dispatch(deleteOrderItemById({ id: itemId }));
    dispatch(addOrderItem({ product, quantity: qty, order: undefined } as any));
    setEditingItemId(null);
    setEditedQty('');
  };

  return (
    <SafeAreaView style={registerStyles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
            <Text style={registerStyles.label}>
              Adicionar Produto <Text style={styles.required}>*</Text>
            </Text>
            <Pressable onPress={() => setProductModalVisible(true)} style={styles.dropdown}>
              <Text style={styles.dropdownText}>
                {selectedProduct ? selectedProduct.productName : 'Selecione um produto'}
              </Text>
              <AntDesign name="caretdown" size={14} color="#666" />
            </Pressable>

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={registerStyles.label}>Quantidade</Text>
                <TextInput
                  style={registerStyles.input}
                  placeholder="0"
                  keyboardType="numeric"
                  value={quantity}
                  onChangeText={setQuantity}
                  placeholderTextColor="#999"
                />
              </View>
              <View style={styles.column}>
                <Text style={registerStyles.label}>Preço Unitário</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.currency}>R$</Text>
                  <TextInput
                    style={styles.price}
                    editable={false}
                    placeholder="0,00"
                    value={selectedProduct ? selectedProduct.price.toFixed(2).replace('.', ',') : ''}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            </View>

            <GreenButton title="Adicionar Produto" onPress={handleAddProduct} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
              <Text style={registerStyles.label}>Produtos adicionados</Text>
              {orderItems.length > 0 && (
                <TouchableOpacity onPress={() => setItemsModalVisible(true)}>
                  <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Ver itens</Text>
                </TouchableOpacity>
              )}
            </View>
            {orderItems.length === 0 && (
              <Text style={{ color: '#555', marginBottom: 15 }}>Nenhum item adicionado.</Text>
            )}

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={registerStyles.label}>Qtd. Produtos</Text>
                <TextInput style={registerStyles.input} editable={false} value={totalQuantity.toString()} />
              </View>
              <View style={styles.column}>
                <Text style={registerStyles.label}>Sub‑total</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.currency}>R$</Text>
                  <TextInput style={styles.price} editable={false} value={subtotal.toFixed(2).replace('.', ',')} />
                </View>
              </View>
            </View>

            <GreenButton title="Pagar" onPress={handleFinishOrderAndGoToPayment} />
            <GreenButton title="Terminar Compra" onPress={handleFinishOrderNotPay} />
          </ScrollView>

          <Modal visible={productModalVisible} animationType="slide">
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{ padding: 20, flex: 1 }}>
                <Text style={styles.modalTitle}>Escolha um produto</Text>
                <ScrollView>
                  {products.filter((item) => item.amount > 0)
                  .map((item) => (
                    <Pressable
                      key={item.id}
                      onPress={() => {
                        setSelectedProduct(item);
                        setProductModalVisible(false);
                      }}
                      style={styles.modalItem}
                    >
                      <Text style={styles.modalItemText}>
                        {item.productName} | R$ {item.price.toFixed(2)} | {item.amount} | {item.supplier.supplierName}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
                <GreenButton title="Fechar" onPress={() => setProductModalVisible(false)} />
              </View>
            </SafeAreaView>
          </Modal>

          <Modal visible={itemsModalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalOrderListContainer}>
              <View style={styles.modalorderList}>
                <Text style={[registerStyles.label, { marginBottom: 10 }]}>Itens adicionados</Text>
                <ScrollView style={{ marginBottom: 20 }}>
                  {orderItems.map((item) => (
                    <View style={styles.itemRow} key={item.id}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.itemName}>{item.product.productName}</Text>
                        {editingItemId === item.id ? (
                          <TextInput
                            style={styles.editQtyInput}
                            keyboardType="numeric"
                            value={editedQty}
                            onChangeText={setEditedQty}
                          />
                        ) : (
                          <Text style={styles.itemDetails}>
                            {item.quantity} × R$ {item.product.price.toFixed(2)} = R${' '}
                            {(item.quantity * item.product.price).toFixed(2)}
                          </Text>
                        )}
                      </View>
                      {editingItemId === item.id ? (
                        <TouchableOpacity onPress={() => handleSaveEditQty(item.id, item.product)} style={{ marginHorizontal: 5 }}>
                          <Feather name="check" size={20} color="green" />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            setEditingItemId(item.id);
                            setEditedQty(item.quantity.toString());
                          }}
                          style={{ marginHorizontal: 5 }}
                        >
                          <Feather name="edit-2" size={20} color="#007AFF" />
                        </TouchableOpacity>
                      )}
                      <Pressable onPress={() => handleRemoveItem(item.id)}>
                        <Feather name="trash-2" size={20} color="#b00020" />
                      </Pressable>
                    </View>
                  ))}
                </ScrollView>
                <TouchableOpacity onPress={() => setItemsModalVisible(false)} style={{ alignSelf: 'flex-end' }}>
                  <Text style={styles.buttonClose}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  required: { color: 'red' },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  dropdownText: {
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
  priceContainer: {
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
    marginRight: 6,
    color: '#333',
  },
  price: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 15,
  },
  modalItemText: {
    fontSize: 16,
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    padding: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemDetails: {
    color: '#555',
  },
  editQtyInput: {
    borderBottomWidth: 1,
    borderColor: '#aaa',
    paddingVertical: 4,
    fontSize: 14,
    width: 60,
    color: '#333',
  },
  buttonClose: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  modalOrderListContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalorderList: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
});
