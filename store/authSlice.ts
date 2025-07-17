import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL_AUTH_SIGN_IN } from './env';

interface AuthState {
  acessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  acessToken: null,
  loading: false,
  error: null,
};


export const login = createAsyncThunk(
  'auth/sign-in',
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(API_URL_AUTH_SIGN_IN, { username, password });
      console.log('Resposta do login:', response.data);
      return response.data.acessToken;
    } catch (error: any) {
      console.error('Erro ao fazer login:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue('Credenciais inválidas');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.acessToken = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.acessToken = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
