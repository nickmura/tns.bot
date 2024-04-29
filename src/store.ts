import { configureStore } from '@reduxjs/toolkit';
import auctionReducer from './slices/AuctionSlice';
import domainReducer from './slices/AuctionSlice';
const store = configureStore({
  reducer: {
    auctions: auctionReducer,
    domains: domainReducer

  },
})

export default store