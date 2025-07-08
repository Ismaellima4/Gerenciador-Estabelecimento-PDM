import customer from "@/types/customer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { randomUUID } from "expo-crypto";
import { RootState } from "./store";


interface custormerState {
    list: customer[];
}
const initialState: custormerState = {
    list: [],
};

type NewCustomer = Omit<customer, 'id'>;


const customerSlice =  createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<NewCustomer>) => {
            const customerWithId = {
                ...action.payload,
                id: randomUUID()
            }
            state.list.push(customerWithId)
        },
       setCustomer: (state, action: PayloadAction<customer[]>) => {
          state.list = action.payload;
       },
       updateCustomer: (state, action: PayloadAction<customer>) => {
         const index = state.list.findIndex(
            (customer) => customer.id === action.payload.id
         );
         if (index !== -1) {
           state.list[index] = action.payload;
        }
       },
       deleteCustomerById: (state, action: PayloadAction<{id: string}>) => {
       state.list = state.list.filter(
        (customer) => customer.id !== action.payload.id
      );
    },
    },
});

export const findCustomerById = (state: RootState, id: string) => state.customer.list.find((customer) => customer.id === id);
export const { addCustomer, setCustomer, updateCustomer, deleteCustomerById } = customerSlice.actions;

export default  customerSlice.reducer;