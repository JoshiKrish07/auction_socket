import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUpcomingAuctions = createAsyncThunk(
  'auctions/fetchUpcomingAuctions',
  async (auctId, { rejectWithValue }) => {
    try {
      const url = auctId 
        ? `/api/upcoming-auctions?auct_id=${auctId}` 
        : `/api/upcoming-auctions`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch auctions');
      }
      
      return data.data;

    } catch (error) {
      console.error("Error fetching upcoming auctions:", error);
      return rejectWithValue('An error occurred while fetching auctions.');
    }
  }
);

const upcomingAuctionSlice = createSlice({
  name: 'upcomingAuction',
  initialState: {
    auction: null,
    upcomingAuctions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingAuctions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingAuctions.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.upcomingAuctions = action.payload;
        } else {
          state.auction = action.payload;
        }
      })
      .addCase(fetchUpcomingAuctions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch auctions';
      });
  },
});

export default upcomingAuctionSlice.reducer;
