export interface Holding {
  ticker: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  sector: string;
}

type Mode = 'normal' | 'large' | 'chaotic' | 'extreme';

export function generateHoldings(
  count: number,
  mode: Mode = 'normal',
): Holding[] {
  const sectors = ['Technology', 'Finance', 'Energy', 'Healthcare', 'Consumer'];

  return Array.from({ length: count }).map((_, i) => {
    let shares: number;
    let avgPrice: number;
    let currentPrice: number;

    switch (mode) {
      case 'chaotic':
        shares = Math.floor(Math.random() * 100) - 20; // allow negatives
        avgPrice = Math.random() * 500;
        currentPrice = Math.random() * 2000 - 500; // allow negatives
        break;

      case 'extreme':
        shares = Math.floor(Math.random() * 1000);
        avgPrice = Math.random() * 1e6;
        currentPrice = Math.random() * 1e7;
        break;

      case 'large':
        shares = Math.floor(Math.random() * 100) + 1;
        avgPrice = Math.random() * 500;
        currentPrice = Math.random() * 1000;
        break;

      default: // normal
        shares = Math.floor(Math.random() * 50) + 1;
        avgPrice = 100 + Math.random() * 50;
        currentPrice = 100 + Math.random() * 100;
        break;
    }

    return {
      ticker: `${mode.toUpperCase()}${i}`,
      shares,
      avgPrice,
      currentPrice,
      sector: sectors[i % sectors.length],
    };
  });
}
