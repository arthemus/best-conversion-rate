import { Currency, Outcome } from "../models/models";

/**
 * @param raw Array of currency raw data
 * @returns Returns a Map with distinct countries and currency code.
 */
export function getCountries(raw: Currency[]): Map<string, string> {
    const countries: Map<string, string> = new Map();
    for (let i = 0; i < raw.length; i++) {
        const item: Currency = raw[i];
        if (countries.has(item.fromCurrencyCode) && countries.has(item.toCurrencyCode))
            continue;
        countries.set(item.fromCurrencyCode, item.fromCurrencyName);
        countries.set(item.toCurrencyCode, item.toCurrencyName);
    }
    return countries;
}

/**
 * @param value Value to be rounded
 * @param precision Number of decimals to precise the value
 * @returns The same value received treated and rounded
 */
export function roundTo(value: number, precision: number): number {
    if (value === Infinity)
        return 0.0;
    return +(Math.round(Number(value + "e+" + precision)) + "e-" + precision);
}

/**
 * @param initialAmount Amount to be shown as a new value after rates applied
 * @param countries A Map with distinct countries and currency codes
 * @param data Outcome data already processed
 * @returns A string with all the data processed ready to be save in a CSV file
 */
export function getCSVContent(initialAmount: number, countries: Map<string, string>, data: Outcome) {
    const header: string[] = ['CURRENCY_CODE', 'COUNTRY', 'AMOUNT', 'PATH'];
    const dataArray: string[][] = [];

    countries.forEach((country: string, currency: string) => {
        const rate: number = data.rates.get(currency) || 0;
        const finalAmount: number = roundTo(initialAmount * rate, 2);
        const path: string = data.paths.get(currency) || "N/A";

        dataArray.push([currency, country, finalAmount.toFixed(2), path]);
    });

    const result: string = [header]
        .concat(dataArray)
        .map((o: string[]) => o.join(','))
        .join('\r\n');

    return result;
}
