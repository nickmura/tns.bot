import TonWeb  from "tonweb";
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {apiKey: import.meta.env.VITE_TONCENTER_API_KEY}));


import { TonConnectUIProvider, TonConnectButton, useTonWallet, Wallet, Account } from "@tonconnect/ui-react";
import { createContext, useContext, useEffect } from "react";
import { HttpClient, Api } from 'tonapi-sdk-js';
const WalletContext = createContext<Wallet|null>(null);

export default function TONWallet() {
    //PUBLIC API KEY
   
    const Wallet = useTonWallet()
    let Account = Wallet?.account
    console.log(Account?.address)


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

    


    async function WhoIsSearch(account:Account) {
        const wallet = tonweb.wallet.create({address: Account?.address, publicKey: Account?.publicKey, wc: 0})
        console.log(wallet)

        const address = await tonweb.provider.getExtendedAddressInfo(String(wallet.address))

        const resolve = await client.accounts.accountDnsBackResolve(account.address)
        const current_auctions = await client.dns.getAllAuctions({tld: 'ton'})
        console.log(current_auctions)
        console.log()
        //const dns = mawait client.dns.getDnsInfo('receivedotme.ton')
    
     console.log(resolve)
}
    
    return (
        <>
            {Wallet ? //@ts-ignore
            <button className='rounded-lg'onClick={(e)=>WhoIsSearch(Account)}>
                           Test
            </button>
            : <>

            </>}
            <WalletContext.Provider value={Wallet}> 
                <TonConnectButton />
            </WalletContext.Provider>


        </>
    )

}
export const useWallet = () => {
    return useContext(WalletContext ?? 'null')
}