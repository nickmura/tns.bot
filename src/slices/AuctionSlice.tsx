import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import TonWeb from "tonweb";
import { useTonWallet } from "@tonconnect/ui-react";
import { HttpClient, Api } from 'tonapi-sdk-js';

const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', { apiKey: import.meta.env.VITE_TONCENTER_API_KEY }));

const initialState = { 
  auctions: [],
  wallet: null
} 

export const fetchLatestAuctions = createAsyncThunk("auction/fetchLatestAuctions", async (args, { dispatch, getState }) => {
  try {
    const Wallet = args
    let Account = Wallet?.account;

    const httpClient = new HttpClient({
      baseUrl: 'https://tonapi.io/',
      baseApiParams: {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TONAPI_KEY}`,
          'Content-type': 'application/json'
        }
      }
    });
    const client = new Api(httpClient);

    // const wallet = tonweb.wallet.create({ address: Account?.address, publicKey: Account?.publicKey, wc: 0 })
    // dispatch(setWallet(wallet))
    const current_auctions = await client.dns.getAllAuctions({ tld: 'ton' });
    console.log("AUCTIONS", current_auctions)
    dispatch(setAuctions(current_auctions.data))
  } catch (error) {
    console.error("Error fetching auctions:", error);
    // Handle errors as appropriate for your application context
  }
}
);

const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    setAuctions(state, { payload }) {
      state.auctions = payload
    },
    setWallet(state, { payload }) {
      state.wallet = payload
    },

  },
})

export const { setAuctions, setWallet} = auctionSlice.actions
export default auctionSlice.reducer