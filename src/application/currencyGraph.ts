import { getCountries, roundTo } from "../infrastructure/utils";
import { Currency, CurrencyEdge, Outcome } from "../models/models";

/**
 * Graph class used to find the best rate of currency conversion.
 */
export class CurrencyGraph {

    /**
     * Static method to helps create a new Graph instance.
     */
    static newGraph(rawData: Currency[]): CurrencyGraph {
        const graph = new CurrencyGraph();

        const countries = getCountries(rawData);
        countries.forEach((_, code) => graph.addNode(code));
        rawData.forEach((item) => graph.addEdge(item.fromCurrencyCode, item.toCurrencyCode, item.exchangeRate));

        return graph;
    }

    private nodes: Set<string> = new Set();

    private edges: Map<string, Set<CurrencyEdge>> = new Map();

    /**
     * Adding a new node on the graph
     * @param currencyCode Code of the currency ie. 'CAD', 'USD' and 'EUR'
     */
    addNode(currencyCode: string) {
        this.nodes.add(currencyCode);
    }

    /**
     * Adding an edge node from a existing node on the graph and the rate to conversion.
     * @param fromCode Origin currency code
     * @param toCode Destiny currency code
     * @param rate Rate value used to conversion origin and target
     */
    addEdge(fromCode: string, toCode: string, rate: number) {
        const edge: Set<CurrencyEdge> = this.edges.get(fromCode) || new Set<CurrencyEdge>();
        const node = new CurrencyEdge(toCode, rate);
        edge.add(node);
        this.edges.set(fromCode, edge);
    }

    /**
     * Compute all nodes and edges on the graph to find the best possible conversion rate for every currency
     * @param source Source currency code to be used as base to conversion
     * @returns An instance of Outcome class with the shortest rates and path
     */
    computeBestRate(source: string): Outcome {
        const rates: Map<string, number> = new Map();
        const parents: Map<string, string> = new Map();
        const visited: Set<string> = new Set();

        this.nodes.forEach((node: string) => {
            if (node === source) {
                rates.set(source, 0);
            } else {
                rates.set(node, Infinity);
            }
            parents.set(node, source);
        });

        let currentNode = this.nodeWithMinRate(rates, visited);

        while (currentNode.length > 0) {
            const rate: number = rates.get(currentNode) || 0;
            const adjacents = this.edges.get(currentNode);
            adjacents?.forEach((to: CurrencyEdge) => {
                const toCode = to.toCode;
                const newRate: number = roundTo(rate + to.rate, 2);
                const rateValue = rates.get(toCode) || 0;
                if (rateValue > newRate) {
                    rates.set(toCode, newRate);
                    if (currentNode !== source) {
                        if (parents.has(toCode)) {
                            const existing = parents.get(toCode);
                            parents.set(toCode, existing + ' | ' + currentNode);
                        } else {
                            parents.set(toCode, currentNode);
                        }
                    }
                }
            });
            visited.add(currentNode);
            currentNode = this.nodeWithMinRate(rates, visited);
        }

        return new Outcome(parents, rates);
    }

    private nodeWithMinRate(rates: Map<string, number>, visited: Set<string>) {
        let minRate: number = Infinity;
        let minNode: string = "";
        rates?.forEach((rate: number, node: string) => {
            if (rate < minRate && !visited.has(node)) {
                minRate = rate;
                minNode = node;
            }
        });
        return minNode;
    }
}
