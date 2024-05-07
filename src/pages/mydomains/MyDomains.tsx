import React, { useEffect } from 'react'
import styles from "./MyDomains.module.css";
import { timeSince } from '../../lib/state';
import TonWeb from 'tonweb';
import { countDecimals } from '../../lib/state';
import Wallet from '../../lib/auth/Wallet';
import { fetchUserDomains } from '../../slices/MyDomainsSlice';
import { useTonWallet } from '@tonconnect/ui-react';
import { useDispatch, useSelector } from 'react-redux';
import DomainsRow from './components/DomainsRow/DomainRow';

//@ts-ignore
function MyDomains() {
  const dispatch = useDispatch();
  const Wallet = useTonWallet(); //@ts-ignore
  const domains = useSelector(state => state.domains.domains);
  console.log("DOMAIN SELECT", domains)

  useEffect(() => {
    if (Wallet) {
      dispatch(fetchUserDomains(Wallet))
    }
    //@ts-ignore


        if (Wallet) {        //@ts-ignore
          dispatch(fetchUserDomains(Wallet))
        }

        
      }, [Wallet])

  return (
    <div className={styles.container}>
        <table className={styles.table}>
            <tbody className={styles.tbody}>
              {/* {JSON.stringify(domains)} */}
                { //@ts-ignore
                    domains?.map((e, i) => {
                        return <>
                          <DomainsRow domain={e} index={i} key={e.domain}/>
                        </> 
                    })
                }
            </tbody>
        </table>
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