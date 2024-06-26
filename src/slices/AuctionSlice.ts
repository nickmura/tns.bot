import { createSlice, createAsyncThunk } from '@reduxjs
import type { PayloadAction } from '@reduxjs/toolkit'
import TonWeb from "tonweb";

import { useTonWallet } from "@tonconnect/ui-react";
import { HttpClienom 'tonapi-sdk-js';

const tonweb = new TonWeb.HttpProvider('https://toncent { apiKey: import.meta.env.VITE_TONCENTER_API_KEY }));

const initialState
  auctions: [],
  wallet: null
} 

export const fetchons = createAsyncThunk("auction/fetch(args, { dispatch }) => {
  try {
    const Wallet =-ignore
    let Account = ount;
    const httpClietpClient({
      baseUrl: 'hti.io/',
      baseApiParam
        headers: 
          Authorizrer ${import.meta.env.VITE_TONAPI_KEY}`,
          'Contentplication/json'
        }
      }
    });
    const client =tpClient);

    // const wallewallet.create({ address: AccouublicKey: Account?.publicKey, wc: 0 })
    // dispatch(selet))
    const current_await client.dns.getAllAuction });
    console.log("Aurrent_auctions)
    dispatch(setAuctions(current_auctions.data)
  } catch (error) {
    console.error("Error fetching auctions:", er
    // Handle errors as appropriate for your appxt
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