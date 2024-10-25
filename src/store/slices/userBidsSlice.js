import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state for user bids
const initialState = {
  userData: {},
  loading: false,
  error: null,
};

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "userBids/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("No token found. Please log in.");
    }

    try {
      const response = await fetch("/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        return rejectWithValue("Token expired. Please log in again.");
      } else if (response.status === 500) {
        return rejectWithValue("Internal Server Error.");
      }

      const data = await response.json();
      return data.user; // assuming 'user' contains the user profile data
    } catch (error) {
      return rejectWithValue("Failed to fetch user profile.");
    }
  }
);

// Redux slice for user bids
const userBidsSlice = createSlice({
  name: "userBids",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userBidsSlice.reducer;
