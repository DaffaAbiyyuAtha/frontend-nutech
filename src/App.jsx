import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./assets/redux/store";
import { persistStore } from "redux-persist";
import ScrollToTop from "./assets/component/ScrollToTop";

import Login from './assets/page/Login';
import Registration from './assets/page/Registration'
import Home from './assets/page/Home'
import Account from './assets/page/Account'
import EditAccount from './assets/page/EditAccount'
import TopUp from './assets/page/TopUp'
import Transaction from './assets/page/Transaction'
import HistoryTransaction from './assets/page/HistoryTransaction'
import Buying from './assets/page/Buying'
import PageNotFound from "./assets/page/PageNotFound";

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/home" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/edit-account" element={<EditAccount />} />
            <Route path="/top-up" element={<TopUp />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/history-transaction" element={<HistoryTransaction />} />
            <Route path="/buying" element={<Buying />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App
