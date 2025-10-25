/**
 * Calculates how much of target crypto you get for a given source amount.
 */
export const calculateSwapAmount = (
  fromAmount: string,
  fromPrice: number | undefined,
  toPrice: number | undefined
): string => {
  if (!fromAmount || !fromPrice || !toPrice) return '';
  const fromValue = parseFloat(fromAmount) * fromPrice;
  const toValue = fromValue / toPrice;
  return toValue.toFixed(6);
};

/**
 * Formats the USD equivalent of a given amount.
 */
export const calculateUsdValue = (amount: string, usdRate?: number): string => {
  if (!amount || !usdRate || isNaN(parseFloat(amount))) return '$0.00';
  const value = parseFloat(amount) * usdRate;
  return `$${value.toFixed(2)}`;
};

/**
 * Validates if a swap amount is valid against balance.
 */
export const validateSwapAmount = (
  amount: string,
  balance: number | undefined
): string | null => {
  if (!amount) return 'Amount is required';
  const parsed = parseFloat(amount);
  if (isNaN(parsed) || parsed <= 0) return 'Enter a valid number';
  if (balance !== undefined && parsed > balance) return 'Insufficient balance';
  return null;
};
