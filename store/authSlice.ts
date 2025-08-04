import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL_AUTH_SIGN_IN, API_URL_USERS } from './env';
import { UserRole } from '@/types/enum/roles.enum';
import { create } from './genericThunk';

interface User {
  username: string;
  role: UserRole;
}


interface CreateUser {
  username: string;
  role: UserRole;
  password: string;
}

interface AuthState {
  acessToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  acessToken: null,
  loading: false,
  error: null,
  user: null,
};


export const createUser = create<User, CreateUser>('users/createUser', API_URL_USERS);

export const login = createAsyncThunk(
  'auth/sign-in',
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(API_URL_AUTH_SIGN_IN, { username, password });
      console.log('Resposta do login:', response.data);

       const loggedInUser: User = {
        username: response.data.username,
        role: response.data.role as UserRole,
      };
      
      return {
        acessToken: response.data.acessToken,
        user: loggedInUser,
      };
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
      state.user = null;
    },
    setUserFromStorage(state, action: PayloadAction<{ acessToken: string; user: User }>) {
      state.acessToken = action.payload.acessToken;
      state.user = action.payload.user;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ acessToken: string; user: User }>) => {
        state.loading = false;
        state.acessToken = action.payload.acessToken;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.acessToken = null;
        state.user = null;
      });
  },
});

export const { logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
