import { CRYPTOS } from "../configurable-constants/cryptos";
import { PRICE_SOURCE } from "../configurable-constants/urls";

export interface PriceResponseItem {
    currency: string;
    date: Date;
    price: number;
}

/**
 * Simulating the price changes
 */

const lastInflationRate: {[key in string]: number} = {
}

export const fetchCryptoPrices = (): Promise<PriceResponseItem[]> => {
    return fetch(PRICE_SOURCE)
        .then(response => response.json())
        .then((data: PriceResponseItem[]) => {
            return data
                .filter(item => CRYPTOS.includes(item.currency))
                .map((item) => {
                    if (!lastInflationRate[item.currency]) {
                        lastInflationRate[item.currency] = 0;
                    }

                    lastInflationRate[item.currency] += (Math.random() * 0.1 - 0.05);
                    item.price += item.price * Math.min(Math.max(lastInflationRate[item.currency], -0.99), 0.99);

                    return item;
                });
        });
}