import payment from "@/types/payment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { randomUUID } from "expo-crypto";


interface PaymentState {
    list: payment[];
}
const initialState: PaymentState = {
    list: [],
};




const paymentSlice =  createSlice({
    name: 'payment',
    initialState,
    reducers: {
        addPayment: (state, action: PayloadAction<payment>) => {
            state.list.push(action.payload)
        },
       setPayment: (state, action: PayloadAction<payment[]>) => {
          state.list = action.payload;
       },
       updatePayment: (state, action: PayloadAction<payment>) => {
         const index = state.list.findIndex(
            (payment) => payment.id === action.payload.id
         );
         if (index !== -1) {
           state.list[index] = action.payload;
        }
       },
       deletePaymentById: (state, action: PayloadAction<{id: string}>) => {
       state.list = state.list.filter(
        (payment) => payment.id !== action.payload.id
      );
    },
    },
});



export const findPaymentById = (state: RootState, id: string) => state.payment.list.find((payment) => payment.id === id);
export const { addPayment, setPayment, updatePayment, deletePaymentById } = paymentSlice.actions;
export default paymentSlice.reducer;