export interface Holding {
  instrumentId: string;
  name: string;
  quantity: number;
  avgPurchasePrice: number;
  costBasisZAR: number;
  currentPriceUSD?: number;   // for US holdings
  currentPriceZAR: number;
  currentValueZAR: number;
  gainLossZAR: number;
  returnPct: number;
  lastUpdated?: Date;         // US market close timestamp
  forexRate?: number;         // USD/ZAR rate applied
  liveToggle?: boolean;       // intraday preview flag
}