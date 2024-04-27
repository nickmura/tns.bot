'use client'

import { useTonWallet } from "@tonconnect/ui-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestAuctions } from "../slices/AuctionSlice";
import AuctionRow from "./components/AuctionCard/AuctionRow";
import styles from "./Auctions.module.css"

export default function Auctions() {
    const dispatch = useDispatch();
    const Wallet = useTonWallet();
    const auctions = useSelector(state => state.auctions.auctions);

    useEffect(() => {
        dispatch(fetchLatestAuctions(Wallet))
    }, [Wallet])

    console.log("AUCTION CHECK", auctions)
    return (
        <table className={styles.table}>
            <thead className={styles.thead}>
                <th className={styles.th}>Sold For</th>
                <th className={styles.th}>Date Sold</th>
            </thead>
            <tbody className={styles.tbody}>
                {
                    auctions?.map((e, i) => {
                        return <AuctionRow auction={e} index={i} key={e.domain}/>
                    })
                }
            </tbody>
        </table>
    )
}