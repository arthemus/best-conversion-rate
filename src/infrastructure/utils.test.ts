import { describe, expect, test } from '@jest/globals';
import { CurrencyGraph } from '../application/currencyGraph';
import { Currency } from "../models/models";
import { mockData } from './data.test';
import { getCountries, getCSVContent, roundTo } from './utils';

describe('Returning a Map of distinct currencies', () => {
    test('As I have the currency data, should return a Map of all currencies countries', () => {
        const data: Currency[] = mockData();
        const countries: Map<string, string> = getCountries(data);
        expect(countries).not.toBeNull();
        expect(countries.size).toBe(4);
    });
});

describe('Rounding a value', () => {
    test('As I have a frational number, should return an rouded number with two decimals charaters', () => {
        let value = 1.35999;
        let newValue = roundTo(value, 2);
        expect(newValue).toBe(1.36);

        value = 1.3445;
        newValue = roundTo(value, 2);
        expect(newValue).toBe(1.34);
    });
});

describe('Generating CSV content', () => {
    test('As I have the outcome and currency data, should create a CSV file content', async () => {
        const rawData = mockData();
        const countries = getCountries(rawData);
        const graph = CurrencyGraph.newGraph(rawData);
        const resultData = graph.computeBestRate('CAD');

        const csvData = getCSVContent(100, countries, resultData);
        expect(csvData).not.toBeNull();
        expect(csvData.length).not.toBe(0);
    });
});
