import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react'
import { GoSearch } from "react-icons/go";
import { Link } from 'react-router-dom'
import styles from "./Navbar.module.css";
import Wallet from "../../lib/auth/Wallet";

export default function Navbar() {
  const navigateTo = useNavigate()
  const [searchName, setSearchName] = useState('')

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  }

  const executeSearch = () => {
    navigateTo(`/search/${searchName}`)
  }

  return (
    <nav className={styles.container}>
      <div className={styles.lineGroup}>
        <Link to={"/"}>Auctions</Link>
        <Link to={"mydomains"}>My Domains</Link>
        <Link to={"search"}>Search</Link>
      </div>
      <div className={styles.searchContainer}>
        <GoSearch className={styles.searchIcon} />
        <input type="text"
          placeholder='Search for ton name... @ex: nick'
          spellCheck="false"
          className={styles.donSearch}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Wallet />
    </nav>
  )
}