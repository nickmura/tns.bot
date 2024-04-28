import React from 'react'
import styles from "./MyDomains.module.css";
import { timeSince } from '../../lib/state';
import TonWeb from 'tonweb';
import { countDecimals } from '../../lib/state';

//@ts-ignore
function MyDomains({ domain, index }) {

  if (!domain.price || !domain.date || !domain.bids || !domain.owner || !domain.domain) {
    return
  }

  const isDomain = countDecimals(Number(TonWeb.utils.fromNano(String(domain.price)))) > 1 ? true: false

  if (!isDomain) {
    return
  }

  //@ts-ignore 
  const timeDifferenceInSeconds = Math.floor((new Date() - (domain.date * 1000)) / 1000) * -1;
  const isLive = timeDifferenceInSeconds > 3600 ? "not live" : "live"

  return (
    <>pizza73</>
    // <tr className={styles.tr}>
    //   <td className={styles.td}>{index}</td>
    //   <td className={styles.td}>{Domain.domain}</td>
    //   <td className={styles.td}>{Number(TonWeb.utils.fromNano(String(Domain.price)))}</td>
    //   <td className={styles.td}>
    //     {Domain.bids}
    //     <p>bids</p>
    //   </td>
    //   <td className={styles.td}>{timeSince(new Date(Domain.date * 1000))}</td>
    //   <td className={styles.td}>{isLive}</td>
    // </tr>
  )
}

export default MyDomains