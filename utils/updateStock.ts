
import { AppDispatch } from '@/store/store';
import  Product  from '@/types/product';
import  OrderItem  from '@/types/order-item';
import { updateProductAmount } from '@/store/productSlice';


export const updateStockAfterOrder = (
  products: Product[],
  orderItems: OrderItem[],
  dispatch: AppDispatch
) => {
  const updated = products.map((product) => {
    const item = orderItems.find((i) => i.product.id === product.id);
    return {
      id: product.id,
      amount: item ? product.amount - item.quantity : product.amount,
    };
  });

  dispatch(updateProductAmount(updated));
};
