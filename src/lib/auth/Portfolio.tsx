import TonWeb  from "tonweb";
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {apiKey: import.meta.env.VITE_TONCENTER_API_KEY}));


import { TonConnectUIProvider, TonConnectButton, useTonWallet, Wallet, Account } from "@tonconnect/ui-react";
import { createContext, useContext, useEffect, useState } from "react";
import { HttpClient, Api } from 'tonapi-sdk-js';
import { timeSince } from "../state";

const WalletContext = createContext<Wallet|null>(null);

export default function Portfolio() {
    //@ts-ignore

    const [ domains, setDomains ] = useState<any>()


    const Wallet = useTonWallet()
    let Account = Wallet?.account

    // Configure the HTTP client with your host and token
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
    
    async function WhoIsSearch() {
        const wallet = tonweb.wallet.create({address: Account?.address, publicKey: Account?.publicKey, wc: 0})
        const address = await tonweb.provider.getExtendedAddressInfo(String(wallet.address))

        const resolve = await client.accounts.getAccountDnsExpiring(String(Account?.address));
        const current_auctions = await client.dns.getAllAuctions({tld: 'ton'});

        setDomains(resolve)
        let date = new Date(current_auctions.data[0].date*1000);
        let auction_date = timeSince(date)
            
    }
    
    return (
        <>
            <div className='border border-white rounded-lg p-10'>
                <h1 className='text-2xl font-bold '>Your .ton names</h1>

                <button className='text-2xl font-bold' onClick={()=>WhoIsSearch()} >Your .ton names</button>
                {JSON.stringify(domains)}
            </div>
        </>
    )

}
export const useWallet = () => {
    return useContext(WalletContext ?? 'null')
}