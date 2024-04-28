import { useState } from 'react'
import Navbar from './Layout/Navbar/Navbar.tsx'
import WebApp from '@twa-dev/sdk';
import './App.css';
import './index.css';
import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";

function  Root() {

  return (
    <div className={styles.container}>
      <Navbar />
      <div className=''>
        <Outlet />
      </div>
    </div>
  )
}

export default Root
