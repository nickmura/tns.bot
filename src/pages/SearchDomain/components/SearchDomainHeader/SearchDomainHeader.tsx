import styles from "./SearchDomainHeader.module.css"
import { useState, useEffect } from "react";
import { FiLink } from "react-icons/fi";
import { BsStopwatch } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import { toUserFriendlyAddress } from "@tonconnect/sdk";


export default function SearchDomainHeader(data) {
    const [domainName, setDomainName] = useState('')
    const [expiring, setExpiring] = useState(0)
    const [owner, setOwner] = useState(null)
    useEffect(() => {
        setDomainName(data?.data?.name)
        setExpiring(data?.data?.expiring_at)
        setOwner(data?.data?.item?.owner?.address)
        console.log("domain recieved: ", data?.data)
    }, [data])

    const shortenAddress = (add:string) => {
        const longAddress = toUserFriendlyAddress(add);
        const firstPart = longAddress.slice(0, 5);
        const lastPart = longAddress.slice(-5);
        return `${firstPart}...${lastPart}`;
    }

    return (
        <div className={styles.searchDomainWrapper}>
            <div className={styles.left}>
                <h3>{domainName}</h3>
                <span>TAKEN</span>
            </div>
            <div className={styles.right}>
                <span>
                    TON DNS
                    <FiLink />
                </span>
                <span>
                    Expires in {expiring}
                    <BsStopwatch />
                </span>
                <FaTelegram className={styles.tgIcon} />
                <span>
                    Owned by
                    {owner ? shortenAddress(owner) : ''}
                    <FiLink />
                </span>
            </div>
        </div>
    )
}