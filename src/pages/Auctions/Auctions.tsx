/* eslint-disable @typescript-eslint/ban-ts-comment */

"use client";

import { useEffect } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useDispatch, useSelector } from "react-redux";

import { fetchLatestAuctions } from "../../slices/AuctionSlice";
import AuctionRow from "./components/AuctionsRow/AuctionRow";
import Filters from "../../Layout/Filters/Filters";
import type { RootState } from "../../store";
import styles from "./Auctions.module.css";

export default function Auctions() {
    const dispatch = useDispatch();
    const Wallet = useTonWallet();
    const auctions = useSelector((state: RootState) => state.auctions.auctions);

    const { filter } = useSelector((state: RootState) => state.filters);

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchLatestAuctions(Wallet));
    }, [Wallet]);

    // Filter
    useEffect(() => {
        console.log(filter);
    }, [filter]);

    return (
        <>
        <Filters />
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
                        auctions?.map((e, i) => {
                            return (
                                <AuctionRow
                                    auction={e}
                                    index={i}
                                    //@ts-ignore
                                    key={e.auction}
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
        </>
    );
}
