import React from "react";
import { Holding } from "../models/Holding";
import { CashEvent } from "../models/CashEvent";
import { calculatePortfolioTotals } from "../utils/calculatePortfolioTotals";

interface Props {
  holdings: Holding[];
  cashEvents: CashEvent[];
  investedCapital: number;
}

const PortfolioDashboard: React.FC<Props> = ({ holdings, cashEvents, investedCapital }) => {
  const totals = calculatePortfolioTotals(holdings, cashEvents, investedCapital);

  return (
    <div className="portfolio-dashboard">
      <h2>Consolidated Portfolio</h2>
      <p><strong>Holdings Value:</strong> R{totals.holdingsValue.toFixed(2)}</p>
      <p><strong>Cash Balance:</strong> R{totals.cashBalance.toFixed(2)}</p>
      <p><strong>Total Value:</strong> R{totals.totalValue.toFixed(2)}</p>
      <p><strong>Profit:</strong> R{totals.profit.toFixed(2)}</p>
      <p><strong>Return %:</strong> {totals.returnPct.toFixed(2)}%</p>
    </div>
  );
};

export default PortfolioDashboard;