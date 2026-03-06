import {
  ParsedTrade,
  ParsedHolding,
  ParsedDividend,
  ParsedCashFlow,
  PortfolioSummary,
} from '../src/types/PortfolioTypes';

// --- Seeded RNG helper ---
function seededRandom(seed: number): () => number {
  let value = seed % 2147483647;
  return () => {
    value = (value * 48271) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

// --- Base factories ---
export function mockParsedTrade(overrides: Partial<ParsedTrade> = {}): ParsedTrade {
  return {
    ticker: 'AAPL',
    company: 'Apple Inc.',
    type: 'buy',
    quantity: 1,
    price: 100,
    total: 100,
    fee: 1,
    net: 101,
    date: '2025-01-01',
    ...overrides,
  };
}

export function mockParsedHolding(overrides: Partial<ParsedHolding> = {}): ParsedHolding {
  return {
    ticker: 'AAPL',
    company: 'Apple Inc.',
    quantity: 1,
    averageCost: 100,
    costBasis: 100,
    currentPrice: 110,
    marketValue: 110,
    unrealizedPnL: 10,
    ...overrides,
  };
}

export function mockParsedDividend(overrides: Partial<ParsedDividend> = {}): ParsedDividend {
  return {
    ticker: 'AAPL',
    company: 'Apple Inc.',
    description: 'Quarterly dividend',
    gross: 10,
    net: 9,
    tax: 1,
    cashManagementFee: 0.5,
    vat: 0.1,
    date: '2025-01-01',
    ...overrides,
  };
}

export function mockParsedCashFlow(overrides: Partial<ParsedCashFlow> = {}): ParsedCashFlow {
  return {
    type: 'deposit',
    description: 'Initial deposit',
    amount: 1000,
    date: '2025-01-01',
    ...overrides,
  };
}

// --- Normal PortfolioSummary ---
export function mockPortfolioSummary(overrides: Partial<PortfolioSummary> = {}): PortfolioSummary {
  return {
    totalMarketValue: 100000,
    totalCostBasis: 85000,
    totalUnrealizedPnL: 15000,
    netCashBalance: 5000,
    realizedPnL: 2000,
    dividends: [mockParsedDividend()],
    cashFlows: [mockParsedCashFlow()],
    trades: [mockParsedTrade()],
    holdings: [mockParsedHolding()],
    ...overrides,
  };
}

// --- Randomized generators ---
export function generateRandomTrades(count: number, seed = 42): ParsedTrade[] {
  const rand = seededRandom(seed);
  const trades: ParsedTrade[] = [];
  for (let i = 0; i < count; i++) {
    const quantity = Math.floor(rand() * 10) + 1;
    const price = Math.round(rand() * 500 + 50);
    const total = price * quantity;
    trades.push({
      ticker: `TICK${i}`,
      company: `Company ${i}`,
      type: rand() > 0.5 ? 'buy' : 'sell',
      quantity,
      price,
      total,
      fee: Math.round(rand() * 10),
      net: total + Math.round(rand() * 10),
      date: `2025-${String(Math.floor(rand() * 12) + 1).padStart(2, '0')}-${String(Math.floor(rand() * 28) + 1).padStart(2, '0')}`,
    });
  }
  return trades;
}

export function generateRandomHoldings(count: number, seed = 99): ParsedHolding[] {
  const rand = seededRandom(seed);
  const holdings: ParsedHolding[] = [];
  for (let i = 0; i < count; i++) {
    const quantity = Math.floor(rand() * 20) + 1;
    const avgCost = Math.round(rand() * 500 + 100);
    const currentPrice = avgCost + Math.round(rand() * 50 - 25);
    holdings.push({
      ticker: `HOLD${i}`,
      company: `Holding ${i}`,
      quantity,
      averageCost: avgCost,
      costBasis: avgCost * quantity,
      currentPrice,
      marketValue: currentPrice * quantity,
      unrealizedPnL: (currentPrice - avgCost) * quantity,
    });
  }
  return holdings;
}

export function generateRandomDividends(count: number, seed = 77): ParsedDividend[] {
  const rand = seededRandom(seed);
  const dividends: ParsedDividend[] = [];
  for (let i = 0; i < count; i++) {
    const gross = Math.round(rand() * 1000 + 50);
    const tax = Math.round(gross * 0.15);
    const net = gross - tax;
    dividends.push({
      ticker: `DIV${i}`,
      company: `DividendCo ${i}`,
      description: 'Quarterly dividend',
      gross,
      net,
      tax,
      cashManagementFee: Math.round(rand() * 10),
      vat: Math.round(rand() * 2),
      date: `2025-${String(Math.floor(rand() * 12) + 1).padStart(2, '0')}-${String(Math.floor(rand() * 28) + 1).padStart(2, '0')}`,
    });
  }
  return dividends;
}

export function generateRandomCashFlows(count: number, seed = 88): ParsedCashFlow[] {
  const rand = seededRandom(seed);
  const flows: ParsedCashFlow[] = [];
  const types: Array<ParsedCashFlow['type']> = ['deposit', 'withdrawal', 'fee', 'vat', 'interest', 'transfer'];
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(rand() * types.length)];
    const amount = Math.round(rand() * 5000 * (type === 'withdrawal' ? -1 : 1));
    flows.push({
      type,
      description: `${type} transaction ${i}`,
      amount,
      date: `2025-${String(Math.floor(rand() * 12) + 1).padStart(2, '0')}-${String(Math.floor(rand() * 28) + 1).padStart(2, '0')}`,
    });
  }
  return flows;
}

// --- Stress summaries ---
export function randomizedStressPortfolioSummary(
  tradeCount: number,
  holdingCount: number,
  dividendCount: number,
  cashFlowCount: number,
  seed = 123
): PortfolioSummary {
  return {
    totalMarketValue: 1000000,
    totalCostBasis: 850000,
    totalUnrealizedPnL: 150000,
    netCashBalance: 50000,
    realizedPnL: 20000,
    dividends: generateRandomDividends(dividendCount, seed + 2),
    cashFlows: generateRandomCashFlows(cashFlowCount, seed + 3),
    trades: generateRandomTrades(tradeCount, seed),
    holdings: generateRandomHoldings(holdingCount, seed + 1),
  };
}

export function chaoticStressPortfolioSummary(seed = 999): PortfolioSummary {
  const rand = seededRandom(seed);
  return {
    totalMarketValue: -5000000,
    totalCostBasis: 10000000,
    totalUnrealizedPnL: -15000000,
    netCashBalance: -1000000,
    realizedPnL: -500000,
    dividends: generateRandomDividends(10, seed).map((d: ParsedDividend) => ({
      ...d,
      gross: d.gross * 100,
      net: d.net * 50,
      tax: d.tax * 10,
    })),
    cashFlows: generateRandomCashFlows(10, seed).map((cf: ParsedCashFlow) => ({
      ...cf,
      amount: cf.amount * (rand() > 0.5 ? 1000 : -1000),
    })),
    trades: generateRandomTrades(20, seed).map((t: ParsedTrade) => ({
      ...t,
      price: t.price * (rand() > 0.5 ? 100 : -50),
      total: t.total * (rand() > 0.5 ? 100 : -50),
    })),
    holdings: generateRandomHoldings(20, seed).map((h: ParsedHolding) => ({
      ...h,
      currentPrice: h.currentPrice * (rand() > 0.5 ? 10 : -5),
      unrealizedPnL: h.unrealizedPnL * (rand() > 0.5 ? 20 : -10),
    })),
  };
}

export function mixedStressPortfolioSummary(seed = 2027): PortfolioSummary {
  return {
    totalMarketValue: 500000,
    totalCostBasis: 850000,
    totalUnrealizedPnL: -350000,
    netCashBalance: -25000,
    realizedPnL: -5000,
    dividends: [
      ...generateRandomDividends(10, seed),
      ...generateRandomDividends(3, seed + 1).map((d: ParsedDividend) => ({
        ...d,
        gross: d.gross * 100,
        net: d.net * 50,
        tax: d.tax * 10,
      })),
    ],
    cashFlows: [
      ...generateRandomCashFlows(10, seed),
      ...generateRandomCashFlows(3, seed + 2).map((cf: ParsedCashFlow) => ({
        ...cf,
        amount: cf.amount * (Math.random() > 0.5 ? 1000 : -1000),
      })),
    ],
    trades: [
      ...generateRandomTrades(20, seed),
      ...generateRandomTrades(5, seed + 3).map((t: ParsedTrade) => ({
        ...t,
        price: t.price * (Math.random() > 0.5 ? 100 : -50),
        total: t.total * (Math.random() > 0.5 ? 100 : -50),
      })),
    ],
    holdings: [
      ...generateRandomHoldings(20, seed),
      ...generateRandomHoldings(5, seed + 4).map((h: ParsedHolding) => ({
        ...h,
        currentPrice: h.currentPrice * (Math.random() > 0.5 ? 10 : -5),
        unrealizedPnL: h.unrealizedPnL * (Math.random() > 0.5 ? 20 : -10),
      })),
    ],
  };
}