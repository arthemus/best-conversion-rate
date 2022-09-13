import { describe, expect, test } from '@jest/globals';
import { Currency } from "../models/models";

export function mockData(): Currency[] {
    const localData = [
        {
            "exchangeRate": 6.162630992907589,
            "fromCurrencyCode": "CAD",
            "fromCurrencyName": "Canada Dollar",
            "toCurrencyCode": "HKD",
            "toCurrencyName": "Hong Kong Dollar"
        },
        {
            "exchangeRate": 0.7934887835102495,
            "fromCurrencyCode": "CAD",
            "fromCurrencyName": "Canada Dollar",
            "toCurrencyCode": "USD",
            "toCurrencyName": "USA Dollar"
        },
        {
            "exchangeRate": 0.574833351294154,
            "fromCurrencyCode": "USD",
            "fromCurrencyName": "USA Dollar",
            "toCurrencyCode": "HKD",
            "toCurrencyName": "Hong Kong Dollar"
        },
        {
            "exchangeRate": 6.46332141887901,
            "fromCurrencyCode": "USD",
            "fromCurrencyName": "USA Dollar",
            "toCurrencyCode": "CNY",
            "toCurrencyName": "China Yuan/Renminbi"
        },
        {
            "exchangeRate": 1.2215581952956762,
            "fromCurrencyCode": "CNY",
            "fromCurrencyName": "China Yuan/Renminbi",
            "toCurrencyCode": "HKD",
            "toCurrencyName": "Hong Kong Dollar"
        }
    ];
    return Array.from(localData) as Currency[];
}

describe('Reading currency data', () => {
    test('As reading data from file, should return an array of objects', () => {
        const data: Currency[] = mockData();
        expect(data).not.toBeNull();
        expect(data).toHaveLength(5);
    });
});
