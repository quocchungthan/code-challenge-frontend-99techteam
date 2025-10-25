import { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

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
  balance,
  usdValue,
  disabled = false
}: CryptoInputProps) => {
  const formattedUsdValue = useMemo(() => {
    if (!usdValue || !amount || isNaN(parseFloat(amount))) return '$0.00';
    return `$${(parseFloat(amount) * usdValue).toFixed(2)}`;
  }, [amount, usdValue]);

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

        <div className="relative">
          <select
            value={selectedCrypto}
            onChange={(e) => onCryptoChange(e.target.value)}
            className="appearance-none bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 pr-10 font-semibold cursor-pointer outline-none transition-colors"
          >
            {availableCryptos.map((crypto) => (
              <option key={crypto} value={crypto}>
                {crypto}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-2/5 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
