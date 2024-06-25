import { configureStore } from '@reduxjs/toolkit';
import auctionReducer from './slices/AuctionSlice';
import domainReducer from './slices/MyDomainsSlice';
import filterReducer from './slices/FilterSlice';
import SearchDomain from './slices/SearchDomain';

const store = configureStore({
  reducer: {
    auctions: auctionReducer,
    domains: domainReducer,
    filters: filterReducer,
    searchDomain: SearchDomain
  },
})

export default store

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']