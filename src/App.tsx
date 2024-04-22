import { useState } from 'react'
import reactLogo from './assets/react.svg'
import twaLogo from './assets/tapps.png'
import viteLogo from '/vite.svg'
import './App.css'

import './index.css';
import Navbar from './lib/Navbar.tsx'
import Example from './lib/Example.tsx'
import WebApp from '@twa-dev/sdk';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';


function App() {
  const [count, setCount] = useState(0)



  return (
    <>
      <Example/>


 

      <div className=''>

      </div>
      <h1 className='font-bold my-20'>TWA + Vite + React</h1>

      {/* <button className='text-indigo-500'>
        fff
      </button> */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>


      {/*  */}
      <div className="card">
        <button onClick={() => WebApp.showAlert(`Hello World! Current count is ${count}`)}>
            Show Alert
        </button>
      </div>
    </>
  )
}

export default App
