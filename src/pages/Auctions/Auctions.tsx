"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestAuctions } from "../../slices/AuctionSlice";
import AuctionRow from "./components/AuctionsRow/AuctionRow";
import styles from "./Auctions.module.css";

export default function Auctions() {
    const dispatch = useDispatch();
    const Wallet = useTonWallet(); //@ts-ignore
    const auctions = useSelector((state) => state.auctions.auctions);
    console.log(auctions);

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchLatestAuctions(Wallet));
    }, [Wallet]);

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th className={styles.th}>Domain name</th>
                        <th className={styles.th}>Price</th>
                        <th className={styles.th}>Total bids</th>
                        <th className={styles.th}>Date</th>
                        <th className={styles.th}>Status</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {
                        //@ts-ignore
                        auctions?.map((e, i) => {
                            return (
                                <AuctionRow
                                    auction={e}
                                    index={i}
                                    key={e.auction}
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
