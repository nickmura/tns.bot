import React from 'react'
import styles from "./AuctionRow.module.css";
import { timeSince } from '../../../../lib/state';
import TonWeb from 'tonweb';
import { countDecimals } from '../../../../lib/state';

//@ts-ignore
function AuctionRow({ auction, index }) {

  if (!auction.price || !auction.date || !auction.bids || !auction.owner || !auction.domain) {
    return
  }

  const isAuction = countDecimals(Number(TonWeb.utils.fromNano(String(auction.price)))) > 1 ? true: false

  if (!isAuction) {
    return
  }

  //@ts-ignore 
  const timeDifferenceInSeconds = Math.floor((new Date() - (auction.date * 1000)) / 1000) * -1;
  const isLive = timeDifferenceInSeconds > 3600 ? "not live" : "live"

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{index}</td>
      <td className={styles.td}>{auction.domain}</td>
      <td className={styles.td}>{Number(TonWeb.utils.fromNano(String(auction.price)))}</td>
      <td className={styles.td}>
        {auction.bids}
        <p>bids</p>
      </td>
      <td className={styles.td}>{timeSince(new Date(auction.date * 1000))}</td>
      <td className={styles.td}>{isLive}</td>
    </tr>
  )
}

export default AuctionRow