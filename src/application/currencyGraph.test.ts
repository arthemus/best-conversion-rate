import { describe, expect, test } from '@jest/globals';
import { CurrencyGraph } from './currencyGraph';

describe('Testing Graph Algorithm', () => {
    test('As the a sample graph were made, should return the minimum rate', () => {
        const graph = new CurrencyGraph();
        graph.addNode("CAD");
        graph.addNode("USD");
        graph.addNode("HKD");
        graph.addNode("CNY");
        graph.addEdge("CAD", "USD", 0.79);
        graph.addEdge("CAD", "HKD", 6.16);
        graph.addEdge("USD", "HKD", 0.57);
        graph.addEdge("USD", "CNY", 6.46);
        graph.addEdge("CNY", "HKD", 1.22);

        const result = graph.computeBestRate("CAD");
        expect(result).not.toBeNull();

        const rates = result.rates;
        expect(rates).not.toBeNull();
        expect(rates.size).not.toBe(0);
        expect(result.rates.get("HKD")).toBe(1.36);
    });
});
