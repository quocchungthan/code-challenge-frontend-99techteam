import { useState, useEffect } from 'react';
import { FAKE_BALANCE } from '../configurable-constants/cryptos';

interface Balance {
  [crypto: string]: number;
}

export const useBalance = () => {
  const [balances, setBalances] = useState<Balance>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalances = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      setBalances(FAKE_BALANCE);

      setLoading(false);
    };

    fetchBalances();
  }, []);

  return { balances, loading };
};
