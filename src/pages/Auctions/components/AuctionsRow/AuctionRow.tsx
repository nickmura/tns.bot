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
      {/* <td className={styles.td}>{index}</td> */}
      <td className={styles.td}>{auction.domain}</td>
      <td className={styles.td}>
        <div className={styles.price}>
          <img src="/icon.png" alt="TON" />
          {Number(TonWeb.utils.fromNano(String(auction.price))).toFixed(3)}
        </div>
      </td>
      <td className={styles.td} style={{ textAlign: "center" }}>
        <p>{auction.bids} bids</p>
      </td>
      <td className={styles.td}>{timeSince(new Date(auction.date * 1000))}</td>
      <td className={styles.td}><span className={isLive === "live" ? styles.live : undefined}>{isLive}</span></td>
    </tr>
  )
}

export default AuctionRow