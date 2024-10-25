import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch live auction and lot details
export const fetchLiveAuction = createAsyncThunk(
  'auction/fetchLiveAuction',
  async (_, thunkAPI) => {
    try {
      // Fetch the live auction
      const auctionResponse = await fetch('/api/live-auction', { method: 'GET' });
      if (!auctionResponse.ok) throw new Error('Failed to fetch live auction');
      const { data: auction } = await auctionResponse.json();
        
      // Fetch the lot details for the auction
      if(auction) {
          //   const lotResponse = await fetch(`/api/lot-details?auctionId=${auction.auction_id}`, {
              const lotResponse = await fetch(`/api/lot-details`, {
              method: 'GET',
            });
            if (!lotResponse.ok) throw new Error('Failed to fetch lot details');
      
            const { data: lots } = await lotResponse.json();
            return { auction, lots };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch individual lot details by lotId
export const fetchLotDetails = createAsyncThunk(
    'auction/fetchLotDetails',
    async (lotId, thunkAPI) => {
      try {
        const lotResponse = await fetch(`/api/lot-details?lot_id=${lotId}`, {
          method: 'GET',
        });
        if (!lotResponse.ok) throw new Error('Failed to fetch lot details');
  
        const { data } = await lotResponse.json();
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const fetchAuctionDetails = createAsyncThunk(
    'auction/fetchAuctionDetails',
    async (auctId, thunkAPI) => {
      try {
        const auctionResponse = await fetch(`/api/live-auction?auct_id=${auctId}`, {
          method: 'GET',
        });
        if (!auctionResponse.ok) throw new Error('Failed to fetch auction_detail');
  
        const { data } = await auctionResponse.json();
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

const auctionSlice = createSlice({
  name: 'auction',
  initialState: {
    auction: null,
    singleAuctionDetail: null,
    lots: [],
    lotDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLiveAuction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiveAuction.fulfilled, (state, action) => {
        state.auction = action.payload.auction;
        state.lots = action.payload.lots;
        state.loading = false;
      })
      .addCase(fetchLiveAuction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // case for fetching individual lot details
      .addCase(fetchLotDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLotDetails.fulfilled, (state, action) => {
        state.lotDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchLotDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // case for fetching individual auction detail
      .addCase(fetchAuctionDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuctionDetails.fulfilled, (state, action) => {
        state.singleAuctionDetail = action.payload;
        state.loading = false;
      })
      .addCase(fetchAuctionDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
  },
});

export default auctionSlice.reducer;
