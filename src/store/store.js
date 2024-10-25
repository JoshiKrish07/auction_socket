
import { configureStore } from '@reduxjs/toolkit';
import auctionReducer from './slices/auctionSlices';
import authReducer from './slices/authSlices';
import bidDisplay from './slices/bidDisplaySlice';
import userBidsDisplay from './slices/userBidsSlice';
import allDataSlices from './slices/allDataSlice';

const store = configureStore({
  reducer: {
    auction: auctionReducer,
    auth: authReducer,
    biddisplay: bidDisplay,
    userProfile: userBidsDisplay,
    tablesData: allDataSlices
  },
});

export default store;
