import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useTonWallet } from "@tonconnect/ui-react";
import { HttpClient, Api } from 'tonapi-sdk-js';

const initialState = {
    domainInfo: '',
    domainBids: [],
    additionalDomains: [],
}

export const fetchDomainInfo = createAsyncThunk("domains/fetchLatestAuctions", async (args, { dispatch }) => {
    try {
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
        const donName = args
        if (donName !== undefined) {
            const domainInfo = await client.dns.getDnsInfo(donName);
            const domainBids = await client.dns.getDomainBids(donName)
            dispatch(setDomainInfo(domainInfo))
            dispatch(setDomainBids(domainBids));
            const address = domainInfo?.item?.owner?.address
            if (address !== undefined) {
                const getAdditionalDomains = await client.accounts.getAccountDnsExpiring(address)
                dispatch(setAdditionalDomains(getAdditionalDomains))
            }
        }
    } catch (error) {
        console.error("Error fetching search domain:", error);
    }
}
);

const searchDomainSlice = createSlice({
    name: 'domainSearch',
    initialState,
    reducers: {
        setDomainInfo(state, { payload }) {
            state.domainInfo = payload
        },
        setDomainBids(state, { payload }) {
            state.domainBids = payload
        },
        setAdditionalDomains(state, { payload }) {
            state.additionalDomains = payload
        }
    },
})


export const { setDomainInfo, setAdditionalDomains, setDomainBids } = searchDomainSlice.actions
export default searchDomainSlice.reducer