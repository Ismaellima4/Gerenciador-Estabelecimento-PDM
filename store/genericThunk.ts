import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";


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


export const getAuthHeaders = (state: RootState) => {
  const token = state.auth.acessToken;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};