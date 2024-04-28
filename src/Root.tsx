import { useState } from 'react'
import Navbar from './lib/Navbar.tsx'
import WebApp from '@twa-dev/sdk';
import './App.css'
import './index.css';
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <Navbar />
      <div className=''>
        <Outlet />
      </div>
    </>
  )
}

export default App
