
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
    const dispatch
    const Wallet =
    const auctionsotState) => state.auctions.auctions);
    const filters tState) => state.filters);

    const [filteree<any[]>(auctions);

    useEffect(() =
        //@ts-igno
        dispatch(f));
    }, [Wallet]);

    // Filter
    useEffect(() =
        let newAucns];

        // Search 
        const filtfilter;
        if (filter
            newAuca: any) => a.domain.includes(filterText))
        }

        // Sortin
        if (filter
            const Order === "ascending" ? 1 : -1;

            switch (filters.sortType)
                case "bids":
                    newAuctions.sort(ds - b.bids) * multiplier)
                    break;
                case "price":
                    newAuctions.sort(ice - b.price) * multiplier)
                    break;
                case "date":
                    newAuctions.sort(te - b.date) * multiplier)
                    break;
            }
        }

        setFiltered(newAuctions);
    }, [filters, auctions]);

    return (
        <>
        <Filters />
        <div className={styles.tableW
            <table className={styles.
                <thead className={sty
                    <tr>
                        <th classNamemain name</th>
                        <th classNameice</th>
                        <th classNametal bids</th>
                        <th classNamete</th>
                        <th classNameatus</th>
                    </tr>
                </thead>
                <tbody className={sty
                    {
                        filtered?.map
                            return (
                                <Auct
                                    a
                                    i
                                    k
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
