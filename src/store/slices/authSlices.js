import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.error); // Reject with error message
      }

      const data = await response.json();
      return data; // user data
    } catch (error) {
      return rejectWithValue('An error occurred. Please try again.');
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    user: null,
    token: null, 
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null; 
    },
    logout: (state) => {
      state.user = null;
      state.token = null; 
      localStorage.removeItem('token'); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
        state.token = action.payload.token; 
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

// Export actions and reducer
export const { clearErrors, logout } = authSlice.actions;
export default authSlice.reducer;
