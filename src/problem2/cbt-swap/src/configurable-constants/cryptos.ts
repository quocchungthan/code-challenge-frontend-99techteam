// I assume my CBT Swap only handle these coins.
export const CRYPTOS = ['BTC', 'ETH', 'USDT', 'USDC', 'SOL', 'BNB', 'BUSD', 'ATOM', 'ZIL', 'LUNA', 'GMX'];

// Fake my balance, actually I'm not this rich.
export const FAKE_BALANCE: Record<typeof CRYPTOS[number], number> = {
    BTC: 0.5234,
    ETH: 2.8901,
    USDT: 5000.00,
    USDC: 3200.00,
    SOL: 15.234,
    BNB: 8.567
};