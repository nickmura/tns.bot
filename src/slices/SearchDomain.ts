import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction /toolkit'
import { useTonWallet } from-react";
import { HttpClient, Api } fjs';

const initialState = {
    domainInfo: '',
    domainBids: [],
    additionalDomains: [],
}

export const fetchDomainInfounk("domains/fetchLatestAuctions", async (args, { dispatch }) => {
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
        if (donName !== undefin
            const domainInfo = .dns.getDnsInfo(donName);
            const domainBids = .dns.getDomainBids(donName)
            dispatch(setDomainIfo))
            dispatch(setDomainBds));
            const address = domm?.owner?.address
            if (address !== und
                const getAdditi= await client.accounts.getAccountDnsExpiring(address)
                dispatch(setAddns(getAdditionalDomains))
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
        setDomainInfo(state, { {
            state.domainInfo =
        },
        setDomainBids(state, { {
            state.domainBids =
        },
        setAdditionalDomains(state, { payload }) {
            state.additionalDomains = payload
        }
    },
})


export const { setDomainInfo, setAdditionalDomains, setDomainBids } = searchDomainSlice.actions
export default searchDomainSlice.reducer