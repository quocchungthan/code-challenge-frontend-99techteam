import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getCryptoIconUrl } from '../utils/resources.helper';

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
  disabled = false,
}: CryptoSelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative w-[120px]'>
      {/* Button to show current selection */}
      <button
        type='button'
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className='w-full bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 flex items-center justify-between font-semibold transition-colors disabled:opacity-50'
      >
        <div className='flex items-center gap-2'>
          <img
            src={getCryptoIconUrl(value.toUpperCase())}
            alt={value}
            className='w-5 h-5'
          />
          <span>{value}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown options */}
      {open && (
        <ul className='absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-48 overflow-auto'>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer'
            >
              <img
                src={getCryptoIconUrl(option.toUpperCase())}
                alt={option}
                className='w-5 h-5'
              />
              <span>{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
