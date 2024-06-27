import { useEffect, useState } from 'react'
import styles from "./AdditionalDomainRow.module.css";
import { Link } from 'react-router-dom';

//@ts-ignore
function AdditionalDomainRow({ item, index }) {
  const [domainName, setDomainname] = useState('')
  useEffect(() => {
    setDomainname(item.name)
  }, [item])
  
  return (
    <tr className={styles.tr} key={item.dns_item.address}>
      <td className={styles.td}>{domainName}</td>
      <td className={styles.td}><Link className={styles.view} to={`/search/${domainName}`}>View </Link></td>
    </tr>
  )
}

export default AdditionalDomainRow