import React, { useEffect, useState } from 'react'
import { toUserFriendlyAddress } from '@tonconnect/sdk';
import styles from "./BidStatusRow.module.css";
import { timeSince } from '../../../../lib/state';

//@ts-ignore
function SearchDomainRow({ item, index }) {
  const [bidder, setbidder] = useState(null)
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState(0)
  useEffect(()=>{
    setbidder(item?.bidder?.address)
    setAmount(item?.value)
    setDate(item?.txTime)
  }, [item])
  
  //@ts-ignore 
  const timeDifferenceInSeconds = Math.floor((new Date() - (date * 1000)) / 1000) * -1;
  const isLive = timeDifferenceInSeconds > 3600 ? "not live" : "live"

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{bidder? toUserFriendlyAddress(bidder) : ''}</td>
      <td className={styles.td}>
        <div className={styles.price}>
          {amount}
        </div>
      </td>
      <td className={styles.td} style={{ textAlign: "center" }}>
        <p>{timeSince(new Date(date * 1000))}</p>
      </td>
      <td className={styles.td}><span className={isLive === "live" ? styles.live : undefined}>{isLive}</span></td>
    </tr>
  )
}

export default SearchDomainRow