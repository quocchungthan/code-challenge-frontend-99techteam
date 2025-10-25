/**
 * 
 * FAKE THE DEPENDENCIES TO SOLVE THE TYPE ISSUE OF THIS FILE.
 */
// fakeReacts.ts
export function useCallback(fn, deps) {
  // Just return the same function — no real memoization
  return fn;
}

export function useMemo<T>(factory: () => T, deps): T {
  // Just run the factory every time — no caching
  return factory();
}

// fakeTypeOfUILib.ts
export type BoxProps = {
  children?: any;
  className?: string;
  style?: Record<string, any>;
  [key: string]: any; // allow arbitrary props
};

// useWalletBalances.ts hook
const useWalletBalances = () => {
    return [[] as WalletBalance[] ];
}

// usePrices.ts hook
const usePrices = () => {
    return [{ } as {
        // Dictionary that map token to its price
        [key in string]: number
    }];
}

// fake WalletRow.tsx
export const WalletRow = ({}: any) => {
    return (<></>);
}

/**
 * END FAKING.
 */

// priorityHelpers.ts
export const INVALID_PRIORITY = -99;
export const getPriority = (blockchain: any): number => {
    switch (blockchain) {
        case 'Osmosis':
            return 100;
        case 'Ethereum':
            return 50;
        case 'Arbitrum':
            return 30;
        case 'Zilliqa':
        case 'Neo':
            return 20;
        default:
            return INVALID_PRIORITY;
    }
}

// START THE REFACTORING TASK.
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {
    classes: {
        row: string;
    }
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, classes, ...rest } = props;
  const [balances, setBalances] = useWalletBalances();
  const [prices, setPrices] = usePrices();

  const sortedBalances = useMemo(() => {
    return balances.map((b) => (
        {
            item: b,
            priority: getPriority(b)
        }))
        .sort((a, b) => b.priority - a.priority)
        .filter(({ item, priority }) => priority >= INVALID_PRIORITY && item.amount > 0)
        .map(({ item }) => item);
  }, [balances]);

  const formattedSortedBalances = useMemo(() => sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    } as FormattedWalletBalance
  }), [sortedBalances]);

  const rows = useMemo(() => {
    return formattedSortedBalances.map((formattedBalance, index: number) => {
        const usdValue = prices[formattedBalance.currency] * formattedBalance.amount;
        return (
            <WalletRow 
                className={classes.row}
                key={formattedBalance.currency}
                amount={formattedBalance.amount}
                usdValue={usdValue}
                formattedAmount={formattedBalance.formatted}
            />)});
  }, [formattedSortedBalances, classes]);

  return (
    <div {...rest}>
      { rows }
    </div>
  );
}