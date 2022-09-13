/**
 * Currency type to parse the API response.
 */
export type Currency = {
    exchangeRate: number
    fromCurrencyCode: string
    fromCurrencyName: string
    toCurrencyCode: string
    toCurrencyName: string
}

/**
 * Auxiliar class to return the shortest rates and paths after processing.
 */
export class Outcome {

    constructor(
        readonly paths: Map<string, string>,
        readonly rates: Map<string, number>
    ) { }
}

/**
 * Edge representation to be used in the graph.
 */
export class CurrencyEdge {

    constructor(
        readonly toCode: string,
        readonly rate: number
    ) { }
}
