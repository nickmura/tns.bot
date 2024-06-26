import { HttpClient, Api } from 'tonapi-sdk-js';
import React, { useState } from 'react';
import { toUserFriendlyAddress } from '@tonconnect/sdk';
import styles from './MiniApp.module.css';


export default function MiniApp() {
  const VITE_TONAPI_KEY = import.meta.env.VITE_TONAPI_KEY

  const [domainName, setDomainName] = useState<string>('');
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const [isForSale, setIsForSale] = useState<boolean>(false)
  const [domainOwner, setDomainOwner] = useState<string>('')
  const [expiringAt, setExpiringAt] = useState<number | string>(0)
  const [marketName, setMarketName] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const [errText, setErrText] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<any>) => {
    setDomainName(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter') {
      getDomainInfo()
      setErrText('')
      setDomainOwner('')
      setExpiringAt(0)
      setMarketName('')
    }
  }

  const httpClient = new HttpClient({
    baseUrl: 'https://tonapi.io/',
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${VITE_TONAPI_KEY}`,
        'Content-type': 'application/json'
      }
    }
  });

  const client = new Api(httpClient);

  const getDomainInfo = async () => {
    try {
      const donInfo = await client.dns.getDnsInfo(domainName);
      if (donInfo?.item?.owner) {
        setIsOwner(true);
        if (donInfo?.expiring_at) {
          const expire = new Date(donInfo.expiring_at * 1000)
          setExpiringAt(expire.toLocaleString())
        } else {
          setExpiringAt(0)
        }

        if (donInfo?.item?.owner?.address) {
          setDomainOwner(donInfo.item.owner.address)
        } else {
          setDomainOwner('')
        }

        if (donInfo?.item?.sale) {
          setIsForSale(true)
          if (donInfo?.item?.sale?.market?.name) {
            setMarketName(donInfo.item.sale.market.name)
          } else {
            setMarketName('')
          }
        }
      }
    } catch (err) {
      setErrText(`That domain doesn't exist. Please check if it is correct and try again`)
      setIsError(true)
    }
  }
  return (
    <div>
      <input type="text" placeholder="Search t.me/ton names..."
        className={styles.searchbar}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {
        isOwner && (
          <div id='don-info-div' className={styles.miniappContainer}>
            <span className={styles.owner}>
              The owner of {domainName.toUpperCase()} is : {domainOwner?(
                <span className={styles.address}>{toUserFriendlyAddress(domainOwner)}</span>
                
                ):''}
            </span>
            <span className={styles.expire}>
              It's expiring at : 
              <span className={styles.time}>{expiringAt}</span>
            </span>
            <span className={styles.sale}>
              {
                isForSale ? `It's on ${marketName} marketplace now for sale.` : `It's not for sale now.`
              }
            </span>
          </div>
        )
      }

      {isError && (
        <span className={styles.errorText}>
          {errText}
        </span>
      )}
    </div>
  )
}