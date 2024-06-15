"use client";

import { useSelector, useDispatch } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { setFilter, setSort } from "../../slices/FilterSlice";
import type { RootState } from "../../store";
import styles from "./Filters.module.css";

export default function Filters() {

  const dispatch = useDispatch();

  const { sortType, sortOrder } = useSelector(
    (state: RootState) => state.filters
  );

  function changeOrder(type: string) {
    console.log(type, sortType, sortOrder);
    if (type === sortType) {
      // Change order
      if (!sortOrder) dispatch(setSort({ type, order: "ascending" }));
      else if (sortOrder === "descending") dispatch(setSort({ type, order: "ascending" }));
      else dispatch(setSort({ type, order: "descending" }));
    } else dispatch(setSort({ type, order: "ascending" }));
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchbar}>
        <IoSearchSharp />
        <input
          placeholder="Search t.me/ton names..."
          onChange={(e) => dispatch(setFilter(e.target.value))}
          spellCheck={false}
        />
      </div>
      <div className={styles.sorts}>
        <SortButton type="bids" order={"bids" === sortType ? sortOrder : null} change={changeOrder}>
          Auction Bids
        </SortButton>
        <SortButton type="price" order={"price" === sortType ? sortOrder : null} change={changeOrder}>
          Price
        </SortButton>
        <SortButton type="date" order={"date" === sortType ? sortOrder : null} change={changeOrder}>
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
