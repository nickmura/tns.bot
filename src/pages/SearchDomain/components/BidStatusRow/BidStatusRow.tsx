import React, { MediaHTMLAttributes, useEffect, useState } from 'react'
import { toUserFriendlyAddress } from '@tonconnect/sdk';
import styles from "./BidStatusRow.module.css";
import { timeSince } from '../../../../lib/state';

//@ts-ignore
function SearchDomainRow({ item, index }) {
  const [bidder, setbidder] = useState(null)
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setbidder(item?.bidder?.address)
    setAmount(item?.value)
    setDate(item?.txTime)
  }, [item])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    //@ts-ignore
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [])

  const shortenAddress = (text: string) => {
    const longAddress = toUserFriendlyAddress(text);
    const firstPart = longAddress.slice(0, 5);
    const lastPart = longAddress.slice(-5);
    return `${firstPart}...${lastPart}`;
  }
  const defaultAddress = (text: string) => {
    return toUserFriendlyAddress(text)
  }

  //@ts-ignore 
  const timeDifferenceInSeconds = Math.floor((new Date() - (date * 1000)) / 1000) * -1;
  const isLive = timeDifferenceInSeconds > 3600 ? "not live" : "live"

  return (
    <tr className={styles.tr} key={item.txHash}>
      {
        isMobile?(
          <td className={styles.td}>{bidder ? shortenAddress(bidder) : ''}</td>
        ) :(
          <td className={styles.td}>{bidder ? defaultAddress(bidder) : ''}</td>
        )
      }
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