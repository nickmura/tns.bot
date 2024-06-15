import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, HttpClient } from "tonapi-sdk-js";

import TonWeb from "tonweb";
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', { apiKey: import.meta.env.VITE_TONCENTER_API_KEY }));

const initialState = { 
  domains: [],
  wallet: null
};


export const fetchUserDomains = createAsyncThunk("domains/fetchUserDomains", async (args, { dispatch }) => {
    try {
        const Wallet = args; 
            //@ts-ignore
        let Account = Wallet?.account;


      const httpClient = new HttpClient({
        baseUrl: 'https://tonapi.io/',
        baseApiParams: {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TONAPI_KEY}`,
            'Content-type': 'application/json',
          } 
        }
      });

      const client = new Api(httpClient);
      console.log("ADDRESS CHECK", Account)
      try {
        const user_domains = await client.accounts.getAccountDnsExpiring(Account?.address); //@ts-ignore
        console.log("domain check", user_domains.items, user_domains)
        dispatch(setDomains(user_domains.items))
      } catch (e) {
        console.log("Domain fetching err:", e)
      }

    } catch (error) {
      console.error("Error fetching domains:", error);
    }
  }
);

  const domainSlice = createSlice({
    name: 'domains',
    initialState,
    reducers: {
      setDomains(state, { payload }) {
        console.log('aaaa', payload)
        state.domains = payload
      },
      setWallet(state, { payload }) {
        state.wallet = payload
      },
  
    },
  })
  
export const { setDomains, setWallet }  = domainSlice.actions
export default domainSlice.reducer