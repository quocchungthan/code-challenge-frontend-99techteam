import { useState, useCallback, useMemo } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { CryptoInput } from './CryptoInput';
import { useBalance } from '../hooks/useBalance';
import { useCryptoPrices } from '../hooks/usePrices';
import { CRYPTOS } from '../configurable-constants/cryptos';
import { calculateSwapAmount } from '../utils/calculation.helpers';

export const SwapForm = () => {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromCrypto, setFromCrypto] = useState(CRYPTOS[0]);
  const [toCrypto, setToCrypto] = useState(CRYPTOS[1]);

  const { balances, loading: balancesLoading } = useBalance();
  const { prices, loading: pricesLoading } = useCryptoPrices();

  const availableFromCryptos = useMemo(
    () => CRYPTOS.filter(crypto => crypto !== toCrypto),
    [toCrypto]
  );

  const availableToCryptos = useMemo(
    () => CRYPTOS.filter(crypto => crypto !== fromCrypto),
    [fromCrypto]
  );

  const handleSwapPositions = useCallback(() => {
    setFromCrypto(toCrypto);
    setToCrypto(fromCrypto);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  }, [fromCrypto, toCrypto, fromAmount, toAmount]);

  const handleFromAmountChange = useCallback((value: string) => {
    setFromAmount(value);
    const newToAmount = calculateSwapAmount(value, prices[fromCrypto], prices[toCrypto]);
    setToAmount(newToAmount);
  }, [fromCrypto, toCrypto, prices, setToAmount, setFromAmount]);

  const handleToAmountChange = useCallback((value: string) => {
    setToAmount(value);
    const newFromAmount = calculateSwapAmount(value, prices[toCrypto], prices[fromCrypto]);
    setFromAmount(newFromAmount);
  }, [fromCrypto, toCrypto, prices, setToAmount, setFromAmount]);

  const handleFromCryptoChange = useCallback((crypto: string) => {
    setFromCrypto(crypto);
    const newToAmount = calculateSwapAmount(fromAmount, prices[crypto], prices[toCrypto]);
    setToAmount(newToAmount);
  }, [fromAmount, toCrypto, prices]);

  const handleToCryptoChange = useCallback((crypto: string) => {
    setToCrypto(crypto);
    const newToAmount = calculateSwapAmount(fromAmount, prices[fromCrypto], prices[crypto]);
    setToAmount(newToAmount);
  }, [fromAmount, fromCrypto, prices]);

  const handleSwap = useCallback(() => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const balance = balances[fromCrypto] || 0;
    if (parseFloat(fromAmount) > balance) {
      alert('Insufficient balance');
      return;
    }

    alert(`Swapping ${fromAmount} ${fromCrypto} for ${toAmount} ${toCrypto}`);
  }, [fromAmount, toAmount, fromCrypto, toCrypto, balances]);

  const isLoading = balancesLoading || pricesLoading;

  return (
    <div className="w-full max-w-md mx-auto bg-gray-50 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">CBT Swap</h2>

      <div className="space-y-1">
        <CryptoInput
          label="From"
          amount={fromAmount}
          onAmountChange={handleFromAmountChange}
          selectedCrypto={fromCrypto}
          onCryptoChange={handleFromCryptoChange}
          availableCryptos={availableFromCryptos}
          balance={balances[fromCrypto]}
          usdValue={prices[fromCrypto]}
          disabled={isLoading}
        />

        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={handleSwapPositions}
            className="bg-white border-4 cursor-pointer border-gray-50 rounded-full p-2 hover:bg-gray-100 transition-colors"
            disabled={isLoading}
          >
            <ArrowDownUp className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <CryptoInput
          label="To"
          amount={toAmount}
          onAmountChange={handleToAmountChange}
          selectedCrypto={toCrypto}
          onCryptoChange={handleToCryptoChange}
          availableCryptos={availableToCryptos}
          balance={balances[toCrypto]}
          usdValue={prices[toCrypto]}
          disabled={false}
        />
      </div>

      <button
        onClick={handleSwap}
        disabled={isLoading || !fromAmount || parseFloat(fromAmount) <= 0}
        className="cursor-pointer w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors"
      >
        {isLoading ? 'Loading...' : 'Swap'}
      </button>
    </div>
  );
};
