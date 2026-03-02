import React from "react";
import { Holding } from "../models/Holding";

interface Props {
  holdings: Holding[];
}

const USHoldingsTable: React.FC<Props> = ({ holdings }) => {
  return (
    <table className="us-holdings">
      <thead>
        <tr>
          <th>Instrument</th>
          <th>Quantity</th>
          <th>Cost Basis (ZAR)</th>
          <th>Current Price (USD)</th>
          <th>Current Value (ZAR)</th>
          <th>Gain/Loss (ZAR)</th>
          <th>Return %</th>
          <th>Last Updated</th>
          <th>Forex Rate</th>
        </tr>
      </thead>
      <tbody>
        {holdings.map(h => (
          <tr key={h.instrumentId}>
            <td>{h.name}</td>
            <td>{h.quantity}</td>
            <td>R{h.costBasisZAR.toFixed(2)}</td>
            <td>${h.currentPriceUSD?.toFixed(2)}</td>
            <td>R{h.currentValueZAR.toFixed(2)}</td>
            <td>R{h.gainLossZAR.toFixed(2)}</td>
            <td>{h.returnPct.toFixed(2)}%</td>
            <td>{h.lastUpdated ? h.lastUpdated.toLocaleString() : "—"}</td>
            <td>{h.forexRate ? h.forexRate.toFixed(2) : "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default USHoldingsTable;