import React, { useContext } from "react";
import StocksContext from "./StocksContext";

export default function Table() {
  const { stocks } = useContext(StocksContext);
  console.log(stocks);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CHANGE</th>
            <th>CHANGE %</th>
            <th>MKT. CAP</th>
          </tr>
          
        </thead>
        {/* <tbody>
              {stocks.map((stock, i) =>{
                 return (<tr key={i}>
                    <td>{stock.name}</td>
                    <td>{stock.price}</td>
                    <td>{stock.change}</td>
                    <td>{stock.per_change}</td>
                    <td>{stock.cap}</td>
                  </tr>)
              })}
          </tbody> */}
      </table>
    </div>
  );
}
