import React from 'react'
import styles from "./MyDomains.module.css";
import { timeSince } from '../../lib/state';
import TonWeb from 'tonweb';
import { countDecimals } from '../../lib/state';

//@ts-ignore
function MyDomains() {


  return (
    <div className={styles.container}>
{/* 
      <tr className={styles.tr}>
        <td className={styles.td}>{index}</td>
        <td className={styles.td}>{Domain.domain}</td>
        <td className={styles.td}>{Number(TonWeb.utils.fromNano(String(Domain.price)))}</td>
        <td className={styles.td}>
          {Domain.bids}
          <p>bids</p>
        </td>
        <td className={styles.td}>{timeSince(new Date(Domain.date * 1000))}</td>
        <td className={styles.td}>{isLive}</td>
      </tr> */}
    </div>
  )
}

export default MyDomains