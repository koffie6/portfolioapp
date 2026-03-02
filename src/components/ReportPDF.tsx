import React from "react";
import CashFlowChart from "./CashFlowChart";
import PerformanceChart from "./PerformanceChart";
import SectorChart from "./SectorChart";
import { ParsedHolding, ParsedCashFlow } from "../utils/parseTransactionHistory";
import "./ReportPDF.css";

interface Props {
  ownerName: string;
  holdings: ParsedHolding[];
  cashFlows: ParsedCashFlow[];
  dividends: any[];
  usdToZar: number;
  totalValue?: number;
  totalCost?: number;
  totalGainLoss?: number;
}

const ReportPDF: React.FC<Props> = ({
  ownerName,
  holdings = [],
  cashFlows = [],
  dividends = [],
  usdToZar,
  totalValue,
  totalCost,
  totalGainLoss,
}) => {
  return (
    <div className="report-pdf">
      <h2>Portfolio Report for {ownerName}</h2>

      <div className="report-grid">
        <div className="report-section">
          <h3>Cash Flow</h3>
          <CashFlowChart cashFlows={cashFlows} usdToZar={usdToZar} />
        </div>

        <div className="report-section">
          <h3>Performance</h3>
          <PerformanceChart holdings={holdings} usdToZar={usdToZar} />
        </div>

        <div className="report-section">
          <h3>Sector Allocation</h3>
          <SectorChart holdings={holdings} />
        </div>
      </div>

      <div className="summary">
        <p>Total Value: {totalValue ?? "N/A"}</p>
        <p>Total Cost: {totalCost ?? "N/A"}</p>
        <p>Total Gain/Loss: {totalGainLoss ?? "N/A"}</p>
      </div>
    </div>
  );
};

export default ReportPDF;