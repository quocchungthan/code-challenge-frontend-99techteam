const CRYPTO_ICON_URL = 'https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/{currency}.svg';

export const getCryptoIconUrl = (currency: string) => {
    return CRYPTO_ICON_URL.replace('{currency}', currency);
}
