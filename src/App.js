import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopBar from './components/TopBar';
import ScrollTop from './components/ScrollTop';
import Coins from './components/Coins';
import Coin from './components/Coin';

//fetches coin information
function App() {
  const [coinList, setCoinList] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/list';
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setCoinList(data))
      .catch((error) => console.log('Error:', error))
  }, [url])

  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path='/' element={<Coins coinList={coinList} />} />
        <Route path='/coin' element={<Coin />}>
          <Route path=':coinId' element={<Coin />} />
        </Route>
      </Routes>
      <ScrollTop />
    </BrowserRouter>
  );
}

export default App;
