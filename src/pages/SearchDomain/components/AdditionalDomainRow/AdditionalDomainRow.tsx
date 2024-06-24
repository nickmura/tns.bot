import React, { useEffect, useState } from 'react'
import styles from "./AdditionalDomainRow.module.css";
import { timeSince } from '../../../../lib/state';
import TonWeb from 'tonweb';
import { countDecimals } from '../../../../lib/state';

//@ts-ignore
function AdditionalDomainRow({ item, index }) {
  const [domainName, setDomainname] = useState('')
  useEffect(() => {
    setDomainname(item)
  }, [item])
  

  return (
    <tr className={styles.tr}>
      {/* <td className={styles.td}>{index}</td> */}
      <td className={styles.td}>{domainName}</td>
      
      <td className={styles.td}><span className={styles.live}>View</span></td>
    </tr>
  )
}

export default AdditionalDomainRow