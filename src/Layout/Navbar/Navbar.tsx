import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react'
import { Link } from 'react-router-dom'
import styles from "./Navbar.module.css";
import Wallet from "../../lib/auth/Wallet";

export default function Navbar() {

  return (
    <nav className={styles.container}>
      <Link to={"auctions"}>Auctions</Link>
      <Link to={"mydomains"}>My Domains</Link>
      <Wallet />
    </nav>
  )
}