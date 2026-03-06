import Dashboard from './src/components/Dashboard';

type AppProps = {
  sentiment?: number | null;
  dividends?:
    | {
        date: string;
        amount: number;
        ticker: string;
        description: string;
      }[]
    | null;
  cashFlows?:
    | {
        date: string;
        inflow: number;
        outflow: number;
      }[]
    | null;
};

export default function App(props: AppProps) {
  return <Dashboard {...props} />;
}
