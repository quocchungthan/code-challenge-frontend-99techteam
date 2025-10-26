import { useState, useEffect } from 'react';
import { fetchCryptoPrices } from '../apis/prices';
import { FETCH_PRICES_INTERVAL } from '../configurable-constants/urls';

interface Prices {
  [crypto: string]: number;
}

export const useCryptoPrices = () => {
  const [prices, setPrices] = useState<Prices>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      const prices = await fetchCryptoPrices();
      const flatMapPrices = prices.reduce((acc, item) => {
        acc[item.currency] = item.price;
        return acc;
      }, {} as Prices);
      setPrices(flatMapPrices);

      setLoading(false);
    };

    fetchPrices();

    const interval = setInterval(fetchPrices, FETCH_PRICES_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { prices, loading };
};
