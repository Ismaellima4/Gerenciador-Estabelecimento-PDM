import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { CreateProduct } from "@/types/product";


export interface HasId {
    id: string;
}

export function fetchAll<Payload, Arg = void>(
  name: string,
  apiUrl: string,
) {
  return createAsyncThunk<Payload, Arg, { state: RootState }>(
    name,
    async (_, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const response = await axios.get<Payload>(apiUrl, getAuthHeaders(state));
      return response.data;
    }
  );
}


export function create<Payload, Arg>(
  name: string,
  apiUrl: string,
) {
  return createAsyncThunk<Payload, Arg, { state: RootState }>(
    name,
    async (newData: Arg, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
        const response = await axios.post<Payload>(apiUrl, newData, getAuthHeaders(state));
        return response.data;
    }
  );
}


export function update<Payload, Arg extends HasId>(
  name: string,
  apiUrl: string,
) {
  return createAsyncThunk<Payload, Arg, { state: RootState }>(
    name,
    async (updatedData: Arg, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const response = await axios.put<Payload>(`${apiUrl}/${updatedData.id}`, updatedData, getAuthHeaders(state));
      return response.data;
    }
  );
}

export function remove<Arg>(
  name: string,
  apiUrl: string,
) {
  return createAsyncThunk<Arg, Arg, { state: RootState }>(
    name,
    async (id: Arg, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      await axios.delete<Arg>(`${apiUrl}/${id}`, getAuthHeaders(state));
      return id;
    }
  );
}

export function createWithFormData<Payload>(
  name: string,
  apiUrl: string,
) {
  return createAsyncThunk<Payload, CreateProduct, { state: RootState }>(
    name,
    async (newData, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;

      const formData = new FormData();

      formData.append('productName', newData.productName);
      if (newData.description) formData.append('description', newData.description);
      formData.append('price', String(newData.price));
      formData.append('category', newData.category);
      formData.append('amount', String(newData.amount));
      formData.append('expirationDate', newData.expirationDate);
      formData.append('barCode', newData.barCode);
      formData.append('manufacturingDate', newData.manufacturingDate);
      formData.append('supplier', newData.supplier);

      if (newData.file) {
        formData.append('file', {
          uri: newData.file.uri,
          name: newData.file.fileName || 'image.jpg',
          type: newData.file.mimeType || 'image/jpeg',
        } as any);
      }

     const response = await fetch(apiUrl, {
      method: 'POST',
      headers: getAuthHeaders(state).headers,
      body: formData,
    });

    return await response.json();
    }
  );
}


export const getAuthHeaders = (state: RootState) => {
  const token = state.auth.acessToken;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};