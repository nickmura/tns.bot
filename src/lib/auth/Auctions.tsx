import TonWeb  from "tonweb";
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {apiKey: import.meta.env.VITE_TONCENTER_API_KEY}));



import { TonConnectUIProvider, TonConnectButton, useTonWallet, Wallet, Account } from "@tonconnect/ui-react";
import { createContext, useContext, useEffect, useState } from "react";
import { HttpClient, Api } from 'tonapi-sdk-js';
const WalletContext = createContext<Wallet|null>(null);


export default function TONAuctions() {

    const [auctions, setAuctions] = useState<any>()

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


    async function fetchLatestAuctions() {
        const wallet = tonweb.wallet.create({address: Account?.address, publicKey: Account?.publicKey, wc: 0})
        console.log(wallet)

        const current_auctions = await client.dns.getAllAuctions({tld: 'ton'}) // HOW TO PARSE DATE? ITS JUST A BIG ASS NUMBER
        console.log(current_auctions)
        setAuctions(current_auctions)
        //const dns = mawait client.dns.getDnsInfo('receivedotme.ton')
    

    } fetchLatestAuctions()

    return ( // TODO: MAKE THE LATEST AUCTIONS APPEAR, PRICE THEY SOLD, AMOUNT OF BIDS, ETC.
        <>
        <p>
            {JSON.stringify(auctions)}
        </p>
            
        </>
    )
}