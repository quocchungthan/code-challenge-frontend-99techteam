import { useMemo, useState, useEffect } from 'react';
import { calculateUsdValue, validateSwapAmount } from '../utils/calculation.helpers';
import { CryptoSelect } from './CryptoSelect';

interface CryptoInputProps {
  label: string;
  amount: string;
  onAmountChange: (value: string) => void;
  selectedCrypto: string;
  onCryptoChange: (value: string) => void;
  availableCryptos: string[];
  balance?: number;
  usdValue?: number;
  disabled?: boolean;
}

export const CryptoInput = ({
  label,
  amount,
  onAmountChange,
  selectedCrypto,
  onCryptoChange,
  availableCryptos,
  balance = 0,
  usdValue,
  disabled = false
}: CryptoInputProps) => {
  const [error, setError] = useState<string | null>(null);

  const formattedUsdValue = useMemo(
    () => calculateUsdValue(amount, usdValue),
    [amount, usdValue]
  );

  useEffect(() => {
    setError(validateSwapAmount(amount, balance));
  }, [amount, balance]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      onAmountChange(value);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        {balance !== undefined && (
          <span className="text-sm text-gray-500">
            Balance: {balance.toFixed(4)}
          </span>
        )}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            disabled={disabled}
            placeholder="0.0"
            className="w-full text-2xl font-semibold bg-transparent outline-none disabled:opacity-50"
          />
          <div className="text-sm text-gray-500 mt-1">
            {formattedUsdValue}
          </div>
        </div>

        <CryptoSelect
          value={selectedCrypto}
          onChange={onCryptoChange}
          options={availableCryptos}
          disabled={disabled}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};
