import styles from "./SearchDomainHeader.module.css"
import { useState, useEffect } from "react";
import { FiLink } from "react-icons/fi";
import { BsStopwatch } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import { toUserFriendlyAddress } from "@tonconnect/sdk";
import { timeAfter } from "../../../../lib/state";

interface SearchDomainHeaderProps {
    data: {
        name: string;
        expiring_at: number;
        item: {
            owner: {
                address: string;
            };
        };
    };
}

export default function SearchDomainHeader(data: SearchDomainHeaderProps) {
    const [domainName, setDomainName] = useState('')
    const [expiring, setExpiring] = useState(0)
    const [owner, setOwner] = useState(null || '')
    useEffect(() => {
        setDomainName(data?.data?.name)
        setExpiring(data?.data?.expiring_at)
        setOwner(data?.data?.item?.owner?.address)
    }, [data])

    const shortenAddress = (add: string) => {
        const longAddress = toUserFriendlyAddress(add);
        const firstPart = longAddress.slice(0, 5);
        const lastPart = longAddress.slice(-5);
        return `${firstPart}...${lastPart}`;
    }

    return (
        <div className={styles.searchDomainWrapper}>
            <div className={styles.left}>
                <h3>{domainName}.ton</h3>
                <span>TAKEN</span>
            </div>
            <div className={styles.right}>
                <span>
                    TON DNS
                    <FiLink />
                </span>
                <span>
                    Expires in {timeAfter(new Date(expiring * 1000))}
                    <BsStopwatch />
                </span>
                <FaTelegram className={styles.tgIcon} />
                <span>
                    Owned by {owner ? shortenAddress(owner) : ''}
                    <FiLink />
                </span>
            </div>
        </div>
    )
}