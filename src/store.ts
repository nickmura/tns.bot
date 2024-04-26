import { configureStore } from '@reduxjs/toolkit';
import auctionReducer from './slices/AuctionSlice';

const store = configureStore({
  reducer: {
    auctions: auctionReducer
  },
})

export default store