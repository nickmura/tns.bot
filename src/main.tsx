import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import WebApp from '@twa-dev/sdk'
import { TonConnectUIProvider } from '@tonconnect/ui-react'



WebApp.ready();



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <TonConnectUIProvider manifestUrl="https://f004.backblazeb2.com/file/trxmini-games-/tonconnect-mainfest.json">
      <App />
     </TonConnectUIProvider>

  </React.StrictMode>,
)
