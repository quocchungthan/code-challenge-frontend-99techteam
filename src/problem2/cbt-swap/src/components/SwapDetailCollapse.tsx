import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import { calculateSwapFee } from '../utils/calculation.helpers';
interface SwapDetailsCollapseProps {
  fromAmount: string;
  fromCrypto: string;
  toAmount: string;
  toCrypto: string;
  feePercent: number;
}

export const SwapDetailsCollapse = ({
  toAmount,
  toCrypto,
  feePercent,
}: SwapDetailsCollapseProps) => {
  const [open, setOpen] = useState(false);

  const { feeAmount, receivedAfterFee } = useMemo(
    () => calculateSwapFee(toAmount, feePercent),
    [toAmount, feePercent]
  );

  return (
    <div className="bg-white rounded-lg shadow-sm mt-4 border border-gray-100">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full cursor-pointer flex justify-between items-center px-4 py-3 text-gray-800 font-medium hover:bg-gray-50 transition-colors"
      >
        <span>Swap Details</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4 pt-2 text-sm text-gray-700 space-y-2 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span>Fee</span>
              <div
                className="relative group cursor-pointer"
                data-tooltip-id="fee-tooltip"
              >
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <Tooltip
                id="fee-tooltip"
                place="top"
                style={{ backgroundColor: '#111', color: '#fff' }}
              >
                This fee covers network costs and liquidity provider fees.
              </Tooltip>
            </div>
            <span>{(feePercent * 100).toFixed(2)}%</span>
          </div>

          <div className="flex justify-between">
            <span>Amount after fee</span>
            <span>
              {receivedAfterFee.toFixed(6)} {toCrypto}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Fee amount</span>
            <span>
              {feeAmount.toFixed(6)} {toCrypto}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
