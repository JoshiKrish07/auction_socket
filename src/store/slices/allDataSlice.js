import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks for API calls
export const fetchAllUsers = createAsyncThunk('allData/fetchAllUsers', async () => {
    const response = await fetch('/api/allusers', {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-store', // Prevent caching
        },
    });
    console.log("===response in fetchallusers====>", response);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    return data; // Return the parsed JSON data
});

export const fetchAllAuctions = createAsyncThunk('allData/fetchAllAuctions', async () => {
    const response = await fetch('/api/all-auctions', {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-store', // Prevent caching
        },
    });
    console.log("===response in fetchallauctions====>", response);
    if (!response.ok) {
        throw new Error('Failed to fetch auctions');
    }

    const data = await response.json();
    return data; // Return the parsed JSON data
});

export const fetchAllLots = createAsyncThunk('allData/fetchAllLots', async () => {
    const response = await fetch('/api/lot-details', {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-store', // Prevent caching
        },
    });
    console.log("===response in fetchallLots====>", response);
    if (!response.ok) {
        throw new Error('Failed to fetch lots');
    }

    const data = await response.json();
    return data; // Return the parsed JSON data
});

export const fetchAllCategories = createAsyncThunk('allData/fetchAllCategories', async () => {
    const response = await fetch('/api/category'); 
    return response.json();
});

export const fetchAllMaterials = createAsyncThunk('allData/fetchAllMaterials', async () => {
    const response = await fetch('/api/materials'); 
    return response.json();
});

// Slice
const allDataSlice = createSlice({
    name: 'allData',
    initialState: {
        allusers: { data: [], loading: false, error: null },
        allauctions: { data: [], loading: false, error: null },
        alllots: { data: [], loading: false, error: null },
        allcategories: { data: [], loading: false, error: null },
        allmaterials: { data: [], loading: false, error: null },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle All Users
            .addCase(fetchAllUsers.pending, (state) => {
                state.allusers.loading = true;
                state.allusers.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.allusers.loading = false;
                state.allusers.data = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.allusers.loading = false;
                state.allusers.error = action.error.message;
            })
            // Handle All Auctions
            .addCase(fetchAllAuctions.pending, (state) => {
                state.allauctions.loading = true;
                state.allauctions.error = null;
            })
            .addCase(fetchAllAuctions.fulfilled, (state, action) => {
                state.allauctions.loading = false;
                state.allauctions.data = action.payload;
            })
            .addCase(fetchAllAuctions.rejected, (state, action) => {
                state.allauctions.loading = false;
                state.allauctions.error = action.error.message;
            })
            // Handle All Lots
            .addCase(fetchAllLots.pending, (state) => {
                state.alllots.loading = true;
                state.alllots.error = null;
            })
            .addCase(fetchAllLots.fulfilled, (state, action) => {
                state.alllots.loading = false;
                state.alllots.data = action.payload;
            })
            .addCase(fetchAllLots.rejected, (state, action) => {
                state.alllots.loading = false;
                state.alllots.error = action.error.message;
            })
            // Handle All Categories
            .addCase(fetchAllCategories.pending, (state) => {
                state.allcategories.loading = true;
                state.allcategories.error = null;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.allcategories.loading = false;
                state.allcategories.data = action.payload;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.allcategories.loading = false;
                state.allcategories.error = action.error.message;
            })
            // Handle All Materials
            .addCase(fetchAllMaterials.pending, (state) => {
                state.allmaterials.loading = true;
                state.allmaterials.error = null;
            })
            .addCase(fetchAllMaterials.fulfilled, (state, action) => {
                state.allmaterials.loading = false;
                state.allmaterials.data = action.payload;
            })
            .addCase(fetchAllMaterials.rejected, (state, action) => {
                state.allmaterials.loading = false;
                state.allmaterials.error = action.error.message;
            });
    }
});

export default allDataSlice.reducer;
