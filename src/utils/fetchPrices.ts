export async function fetchPrices(tickers: string[]): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};

  for (const ticker of tickers) {
    try {
      const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${ticker}`);
      const data = await response.json();
      const price = data?.quoteResponse?.result?.[0]?.regularMarketPrice;
      if (price) prices[ticker] = price;
    } catch (error) {
      console.error(`Failed to fetch price for ${ticker}`, error);
    }
  }

  return prices;
}