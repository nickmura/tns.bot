import styles from "./SearchDomainHeader.module.css"
import { useState, useEffect } from "react";
import { FiLink } from "react-icons/fi";
import { BsStopwatch } from "react-icons/bs";
import { TbBrandTelegram } from "react-icons/tb";
import { toUserFriendlyAddress } from "@tonconnect/sdk";
import { timeSince } from "../../../../lib/state";
import { Link } from "react-router-dom";

interface SearchDomainHeaderProps {
    data: {
        name: string;
        expiring_at: number;
        item: {
            owner: {
                address: string;
            },
            sale: {
                
            } 
        };
    };
}

export default function SearchDomainHeader(headerInfo: SearchDomainHeaderProps) {
    const [domainName, setDomainName] = useState('')
    const [expiring, setExpiring] = useState(0)
    const [owner, setOwner] = useState(null || '')
    const [forSale, setForSale] = useState(false)
 //@ts-ignore
    useEffect(() => {
        setDomainName(headerInfo?.data?.name)
        setExpiring(headerInfo?.data?.expiring_at)
        setOwner(headerInfo?.data?.item?.owner?.address)
        setForSale(headerInfo?.data?.item?.sale? true: false)
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
                <h3>{domainName}</h3>
                <span className={forSale? styles.forSale : styles.taken}>
                    {forSale ? 'For Sale' : 'TAKEN'}
                </span>
            </div>
            <div className={styles.right}>
                <Link className={styles.infoBtn}
                    to={domainName?.endsWith("t.me") ?
                        `https://fragment.com/username/${domainName?.slice(0, -4)}` :
                        `https://dns.ton.org/#${domainName?.slice(0, -4)}`}
                >
                    {
                        domainName?.endsWith(".t.me") ? 'Telegram Username ' : 'TON DNS '
                    }
                    <FiLink />
                </Link>
                <span className={styles.infoBtn}>
                    {
                        domainName?.endsWith("t.me") ? 'N/A' :`Expires in ${timeSince(new Date(expiring * 1000)).slice(0, -4)}`
                    }
                    <BsStopwatch />
                </span>
                <span className={styles.infoBtn}>
                    Owned by {owner ? shortenAddress(owner) : ''}
                    <FiLink />
                </span>
                <Link to={"https://t.me/tonnameservicebot"} className={styles.tgBtn}>
                    <TbBrandTelegram className={styles.tgIcon} />
                </Link>
            </div>
        </div>
    )
}