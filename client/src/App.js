import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Table from "./Table";
import StocksContext from "./StocksContext";
import API from "./API"
function App() {
  const [stocks, setStocks] = useState([]);
  
  useEffect(() => {
    loadStocks(); 
  }, [])
  function loadStocks() {
    API.getStocks()
    .then(res => {
      setStocks(res.data.cleaned)
     
    })
    .catch(err => console.log(err))
  
  }
  console.log(stocks);
  return (
<StocksContext.Provider value={stocks}>
  <Table />

</StocksContext.Provider>
  );
}

export default App;
