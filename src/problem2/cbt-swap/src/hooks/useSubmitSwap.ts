import { useState, useCallback } from 'react';

// Simulate a network delay for API calls
const mockApiCall = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));

export const useMockSwap = () => {
  const [loading, setLoading] = useState(false);

  const performSwap = useCallback(async (fromAmount: string, fromCrypto: string, toCrypto: string) => {
    setLoading(true);
    try {
      // Simulate API delay
      await mockApiCall(2000);
      // Return fake response data
      return {
        success: true,
        message: `Successfully swapped ${fromAmount} ${fromCrypto} to ${toCrypto}`,
      };
    } catch (error) {
      return { success: false, message: 'Swap failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  }, []);

  return { performSwap, loading };
};
