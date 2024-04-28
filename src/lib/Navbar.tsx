import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react'
import Wallet, { useWallet } from './auth/Wallet'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Browse Portfolios', href: '#', current: false },
  { name: 'Auctions', href: '#', current: false },
  { name: 'Lookup', href: '#', current: false },
  { name: 'Tools', href: '#', current: false },
]
//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  return (
    <>
      <div className='flex justify-between'>
        <button className='rounded-lg'>
          Test
        </button>
        <div className='flex flex-row'>
          <a href='/mydomains' className='text-white font-bold mt-2 hover:text-black'>My domains</a>
          
          <Wallet />
        </div>

      </div>
    </>
  )
}