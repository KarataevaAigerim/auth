import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';


const initialState = {
  user: null,
  status: 'idle',
  error: null,
  activationMessage: null,
  confirmationStatus: 'idle',  
  confirmationError: null,     
};

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  });

// Register thunk
export const register = createAsyncThunk('auth/register', async (userInfo) => {
  return await authService.register(userInfo);
});

// Email confirmation thunk
export const confirmEmail = createAsyncThunk('auth/confirmEmail', async (confirmationCode) => {
  return await authService.confirmEmail(confirmationCode);
});

// Token refresh thunk
export const refreshToken = createAsyncThunk('auth/refreshToken', async (refreshToken) => {
  return await authService.refreshToken(refreshToken);
});

// Logout thunk
export const logout = createAsyncThunk('auth/logout', async (refreshToken) => {
  return await authService.logout(refreshToken);
});

// Resend confirmation code thunk
export const resendConfirmationCode = createAsyncThunk('auth/resendConfirmationCode', async (email) => {
  return await authService.resendConfirmationCode(email);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearConfirmationError: (state) => {
      state.confirmationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(register.fulfilled, (state, action) => {
        state.activationMessage = 'Please check your email to activate your account';
      })
      .addCase(confirmEmail.fulfilled, (state, action) => {
        state.confirmationStatus = 'succeeded';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(confirmEmail.rejected, (state, action) => {
        state.confirmationStatus = 'failed';
        state.confirmationError = action.error.message;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'succeeded';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export const { clearError, clearConfirmationError } = authSlice.actions;

export default authSlice.reducer;

