import { ChevronDown } from 'lucide-react';

interface CryptoSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
}

export const CryptoSelect = ({
  value,
  onChange,
  options,
  disabled = false
}: CryptoSelectProps) => {
  return (
    <div className="relative flex">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="appearance-none min-w-[100px] bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 pr-10 font-semibold cursor-pointer outline-none transition-colors disabled:opacity-50"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
    </div>
  );
};
