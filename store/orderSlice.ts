

import order from "@/types/order";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { randomUUID } from "expo-crypto";
import { RootState } from "./store";


interface OrderState {
    list: order[];
}
const initialState: OrderState = {
    list: [],
};



const orderSlice =  createSlice({
    name: 'order',
    initialState,
     reducers: {
        addOrder: (state, action: PayloadAction<order>) => {
            const orderWithId = {
                ...action.payload,
                id: randomUUID()
            }
            state.list.push(orderWithId)
        },
       setOrder: (state, action: PayloadAction<order[]>) => {
          state.list = action.payload;
       },
       updateOrder: (state, action: PayloadAction<order>) => {
         const index = state.list.findIndex(
            (order) => order.id === action.payload.id
         );
         if (index !== -1) {
           state.list[index] = action.payload;
        }
       },
       deleteOrderById: (state, action: PayloadAction<{id: string}>) => {
       state.list = state.list.filter(
        (order) => order.id !== action.payload.id
      );
    },
    },
});

export const findOrderById = (state: RootState, id: string) => state.order.list.find((order) => order.id === id);
export const { addOrder, setOrder, updateOrder, deleteOrderById } = orderSlice.actions;

export default orderSlice.reducer;