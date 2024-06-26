import styles from "./SearchDomainHeader.module.css"
import { useState, useEffect } from "react";
import { FiLink } from "react-icons/fi";
import { BsStopwatch } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import { toUserFriendlyAddress } from "@tonconnect/sdk";
import { timeAfter } from "../../../../lib/state";
import { Link } from "react-router-dom";

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

export default function SearchDomainHeader(headerInfo: SearchDomainHeaderProps) {
    const [domainName, setDomainName] = useState('')
    const [expiring, setExpiring] = useState(0)
    const [owner, setOwner] = useState(null || '')
    useEffect(() => {
        setDomainName(headerInfo?.data?.name)
        setExpiring(headerInfo?.data?.expiring_at)
        setOwner(headerInfo?.data?.item?.owner?.address)
    }, [headerInfo])

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
                <Link to={"https://t.me/ton_test9999_bot"}>
                    <FaTelegram className={styles.tgIcon} />
                </Link>
                <span>
                    Owned by {owner ? shortenAddress(owner) : ''}
                    <FiLink />
                </span>
            </div>
        </div>
    )
}