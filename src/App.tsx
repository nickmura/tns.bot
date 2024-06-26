import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auctions from './pages/Auctions/Auctions';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MyDomains from './pages/mydomains/MyDomains';
import MiniApp from './pages/MiniApp/MiniApp.tsx';
import SearchDomain from './pages/SearchDomain/SearchDomain.tsx';
import Navbar from './Layout/Navbar/Navbar';
import './App.css'
import  styles from './Root.module.css'

function App() {
  return (
    <div className={styles.container}>
      <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Auctions/>} />
        <Route path="/mydomains" element={<MyDomains/>} />
        <Route path="/miniapp" element={<MiniApp/>}/>
        <Route path="/:id" element={<SearchDomain/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App()