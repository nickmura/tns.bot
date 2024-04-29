import React from 'react'
import styles from "./DomainRow.module.css";
import { timeSince } from '../../../../lib/state';
import TonWeb from 'tonweb';
import { countDecimals } from '../../../../lib/state';

//@ts-ignore
function DomainRow({ domain, index }) {
  console.log(domain)
  if (!domain.name || !domain.expiring_at) {
    return
  }

  const isDomain = countDecimals(Number(TonWeb.utils.fromNano(String(domain.price)))) > 1 ? true: false


  //@ts-ignore 
  const timeDifferenceInSeconds = Math.floor((new Date() - (auction.expiring_at * 1000)) / 1000) * -1;
  const isLive = timeDifferenceInSeconds > 3600 ? "not live" : "live"

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{index}</td>
      <td className={styles.td}>{domain.name}</td>
      <td className={styles.td}>{Number(TonWeb.utils.fromNano(String(domain.expiring_at)))}</td>
      {/* <td className={styles.td}>
        {domain.bids}
        <p>bids</p>
      </td> */}
      <td className={styles.td}>{timeSince(new Date(domain.expiring_at * 1000))}</td>
      <td className={styles.td}>{isLive}</td>
    </tr>
  )
}

export default DomainRow