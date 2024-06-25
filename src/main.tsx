import Root from './Root.tsx';
import './index.css';
import WebApp from '@twa-dev/sdk';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { Provider } from 'react-redux';
import store from './store.ts';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import Auctions from './pages/Auctions/Auctions';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MyDomains from './pages/mydomains/MyDomains';
import SearchDomain from './pages/SearchDomain/SearchDomain.tsx';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
WebApp.ready();

// // @ts-ignore
// createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//      <TonConnectUIProvider manifestUrl="https://f004.backblazeb2.com/file/trxmini-games-/tonconnect-mainfest.json">
//       <React.StrictMode>
//         <Router>
//           <Routes>
//             <Route path='/' Component={Root} />
//             <Route path=':/id' Component={SearchDomain} />
//             <Route path='/auctions' Component={Auctions} />
//             <Route path='/mydomains' Component={MyDomains} />
//           </Routes>
//         </Router>
//       </React.StrictMode>,
//     </TonConnectUIProvider>
//   </Provider>
// )

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auctions",
        element: (
          <Auctions />
        ),
      },
      {
        path: "mydomains",
        element: (
          <MyDomains />
        ),
      },
      {
        path: "/:id",
        element: (
          <SearchDomain/>
        )
      }
    ],
  },
]);
//@ts-ignore
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <TonConnectUIProvider manifestUrl="https://f004.backblazeb2.com/file/trxmini-games-/tonconnect-mainfest.json">
      <RouterProvider router={router} />
    </TonConnectUIProvider>
  </Provider>
);