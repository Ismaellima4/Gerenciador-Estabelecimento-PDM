
import orderItem from "@/types/order-item";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { randomUUID } from "expo-crypto";
import { RootState } from "./store";


interface orderItemState {
    list: orderItem[];
}
const initialState: orderItemState = {
    list: [],
};



const orderItemSlice =  createSlice({
    name: 'orderItem',
    initialState,
    reducers: {
        addOrderItem: (state, action: PayloadAction<orderItem>) => {
            const orderItemWithId = {
                ...action.payload,
                id: randomUUID()
            }
            state.list.push(orderItemWithId)
        },
       setOrderItem: (state, action: PayloadAction<orderItem[]>) => {
          state.list = action.payload;
       },
       updateOrderItem: (state, action: PayloadAction<orderItem>) => {
         const index = state.list.findIndex(
            (orderItem) => orderItem.id === action.payload.id
         );
         if (index !== -1) {
           state.list[index] = action.payload;
        }
       },
       deleteOrderItemById: (state, action: PayloadAction<{id: string}>) => {
       state.list = state.list.filter(
        (orderItem) => orderItem.id !== action.payload.id
      );
    },
    },
});


export const findOrderItemById = (state: RootState, id: string) => state.orderItem.list.find((orderItem) => orderItem.id === id);
export const { addOrderItem, setOrderItem, updateOrderItem, deleteOrderItemById } = orderItemSlice.actions;
export default  orderItemSlice.reducer;