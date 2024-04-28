import { useState } from 'react'
import Navbar from './lib/Navbar.tsx'
import WebApp from '@twa-dev/sdk';
import './App.css'
import './index.css';
import Auctions from './pages/Auctions.tsx';
import Portfolio from './lib/auth/Portfolio.tsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
    
      <Auctions/>

      <div className=''>

      </div>
      <h1 className='font-bold my-20 text-lg'>TON Name Service Bot tns.bot</h1>

      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>


      {/*    */}
      <div className="card">
        <button onClick={() => WebApp.showAlert(`Hello World! Current count is ${count}`)}>
            Show Alert
        </button>
      </div>
    </>
  )
}

export default App
