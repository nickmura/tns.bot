'use client'

import { useTonWallet } from "@tonconnect/ui-react";
import { useEffect } from "react";
import {  useDispatch, useSelector } from 'react-redux';
import { fetchLatestAuctions } from "../slices/AuctionSlice";
import AuctionCard from "./components/AuctionCard/AuctionCard";

export default function Auctions() {
    const dispatch = useDispatch();
    const Wallet = useTonWallet();
    const auctions = useSelector(state => state.auctions.auctions);

    useEffect(() => {
        dispatch(fetchLatestAuctions(Wallet))
    }, [Wallet])

    console.log("AUCTION CHECK", auctions)
    return ( 
        <div>
            {
                auctions?.map((e, i) => {
                    return <AuctionCard auction={e}/>
                })
            }
        </div>
    )
}