import TonWeb  from "tonweb";
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {apiKey: import.meta.env.VITE_TONCENTER_API_KEY}));



import { TonConnectUIProvider, TonConnectButton, useTonWallet, Wallet, Account } from "@tonconnect/ui-react";
import { createContext, useContext, useEffect, useState } from "react";
import { HttpClient, Api } from 'tonapi-sdk-js';
import { timeSince } from "../state";
const WalletContext = createContext<Wallet|null>(null);


export default function TONAuctions() {

    const [auctions, setAuctions] = useState<any>()

    const Wallet = useTonWallet()
    let Account = Wallet?.account
    console.log(Account?.address)

    // useEffect(() => {
    //     fetchLatestAuctions()
    // }, [])
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
        setAuctions(current_auctions.data)

        // NEED TO MAKE A MAPPING FOR PRICES

        // EQUAL FLOOR OR NEAR FLOOR DECIMALS SHOULD BE IGNORED AS THEY ARE PROBABLY NOT AUCTIONS.

        // EX. TonWeb.utlis.fromNano(PRICE) == 1.837340987 (PROBABLY AN AUCTION AS IT HAS 0.00000000 decimal place, ADD AUCTION TO ARRAY)
        // EX. TonWeb.utils.fromNano(PRICE) = 500.5 (PROBABLY A BUY ORDER, NEEDS TO BE REMOVED)
        // 
        
        // NEED MAPPING FOR DATE
        // IF THE AUCTION (WHICH PASSES THE CONDITIONs ABOVE) IS <60 minutes on the timeSince(date) function, it should also
        // get a boolean property, live or not... to display...


    

    } 

    return ( // TODO: MAKE THE LATEST AUCTIONS APPEAR, PRICE THEY SOLD, AMOUNT OF BIDS, ETC. //@ts-ignore
        <>{auctions ? auctions.map((auction:any, i:number) => {
            if (i < 50)
            return (
                    
                      <tbody className="divide-y divide-gray-800 sm:p-2">
                            <tr key={auction.address}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                {auction.domain}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{Number(TonWeb.utils.fromNano(String(auction.price)))}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{auction.bids} bids</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{timeSince(new Date(auction.date*1000))}</td>


                            </tr>
                      </tbody>

               
            )
        }) : <>
        <button onClick={fetchLatestAuctions} className="">Get Auctions</button>
        </>}
        {/* <p>
            {JSON.stringify(auctions)}
        </p> */}
            
        </>
    )
}