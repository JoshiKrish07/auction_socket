
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch bid details
export const fetchBidDetails = createAsyncThunk('bidDetails/fetchBidDetails', async ({ lotId, bdHandle }) => {
    // console.log("====lotId====", lotId, "======bdHandle====", bdHandle);
    // const response = await fetch(`/api/bid-display?lotId=${lotId}&bdHandle=${bdHandle}`);
    const response = await fetch(`/api/bid-display`);
    const {data} = await response.json();
    return data;
});

const bidDetailsSlice = createSlice({
    name: 'bidDetails',
    initialState: {
        bidDisplayDetails: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBidDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBidDetails.fulfilled, (state, action) => {
                state.bidDisplayDetails = action.payload;
                state.loading = false;
            })
            .addCase(fetchBidDetails.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default bidDetailsSlice.reducer;