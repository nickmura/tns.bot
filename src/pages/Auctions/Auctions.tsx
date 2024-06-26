
// "use client";

import { useEffect, useState } from "react";
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
    const filters = useSelector((state: RootState) => state.filters);

    const [filtered, setFiltered] = useState<any[]>(auctions);

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchLatestAuctions(Wallet));
    }, [Wallet]);

    // Filter
    useEffect(() => {
        let newAuctions: any[] = [...auctions];

        // Search filter
        const filterText: string = filters.filter;
        if (filterText) {
            newAuctions = auctions.filter((a: any) => a.domain.includes(filterText))
        }

        // Sorting
        if (filters?.sortType) {
            const multiplier = filters.sortOrder === "ascending" ? 1 : -1;

            switch (filters.sortType) {
                case "bids":
                    newAuctions.sort((a, b) => (a.bids - b.bids) * multiplier)
                    break;
                case "price":
                    newAuctions.sort((a, b) => (a.price - b.price) * multiplier)
                    break;
                case "date":
                    newAuctions.sort((a, b) => (a.date - b.date) * multiplier)
                    break;
            }
        }

        setFiltered(newAuctions);
    }, [filters, auctions]);

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
                        filtered?.map((e, i) => {
                            return (
                                <AuctionRow
                                    auction={e}
                                    index={i}
                                    key={i}
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
