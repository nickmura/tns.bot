"use client";

import { useSelector } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { setFilter, setSort } from "../../slices/FilterSlice";
import type { RootState } from "../../store";
import styles from "./Filters.module.css";

export default function Filters() {
  const { sortType, sortOrder } = useSelector(
    (state: RootState) => state.filters
  );

  function changeOrder(type: string) {
    console.log(type, sortType, sortOrder);
    if (type === sortType) {
      // Change order
      if (!sortOrder) setSort({ type, order: "ascending" });
      else if (sortOrder === "descending") setSort({ type, order: "ascending" });
      else setSort({ type, order: "descending" });
    } else setSort({ type, order: "ascending" });
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchbar}>
        <IoSearchSharp />
        <input
          placeholder="Search t.me/ton names..."
          onChange={(e) => setFilter(e.target.value)}
          spellCheck={false}
        />
      </div>
      <div className={styles.sorts}>
        <SortButton type="bids" order={sortOrder} change={changeOrder}>
          Auction Bids
        </SortButton>
        <SortButton type="price" order={sortOrder} change={changeOrder}>
          Price
        </SortButton>
        <SortButton type="date" order={sortOrder} change={changeOrder}>
          Date
        </SortButton>
      </div>
    </div>
  );
}

function SortButton({
  type,
  order,
  change,
  children,
}: {
  type: string;
  order: string | null;
  change: (type: string) => void;
  children: React.ReactNode;
}) {
  return (
    <button onClick={() => change(type)}>
      {children}

      {order && (
        <span>
          { order === "ascending" ? (
            <FaChevronUp />
          ) : (
            <FaChevronDown />
          )}
        </span>
      )}
    </button>
  );
}
