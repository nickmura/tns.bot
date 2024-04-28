import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react'
import Wallet, { useWallet } from '../../lib/auth/Wallet'
import { Link } from 'react-router-dom';
import styles from "./Navbar.module.css";
//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  return (
    <nav className={styles.container}>
        <Link to="auctions" className={styles.link}>Auctions</Link>
        <Link to="mydomains" className={styles.link}>My Domains</Link>
    </nav>
  )
}