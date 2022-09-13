import * as fs from 'fs';
import * as path from 'path';
import { CurrencyGraph } from "./application/currencyGraph";
import { readData } from "./infrastructure/data";
import { getCountries, getCSVContent } from "./infrastructure/utils";

const OUTPUT: string = 'output/data.csv';

/**
 * Fetching a bunch of currency conversion data and compute those
 * to find the best possible conversion rate for each one.
 *
 * @param currency Base currency to be used in conversion to all others
 * @param initialAmount Amount to be calculate with the rates
 */
async function findBestPossibleConversionRate(currency: string, initialAmount: number) {
    const rawData = await readData();

    const countries = getCountries(rawData);

    const graph = CurrencyGraph.newGraph(rawData);

    const resultData = graph.computeBestRate(currency);

    const csvData = getCSVContent(initialAmount, countries, resultData);

    const dir = path.resolve(path.join(process.cwd(), 'output'));
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir);
    fs.writeFileSync(OUTPUT, csvData);

    console.info(`Process completed and CSV file saved at '${OUTPUT}'`);
}

// Default values...
const source: string = 'CAD';
const initialAmount: number = 100;

console.info(`Generating CSV file with the best possible conversion rate from ${source} currency`);
findBestPossibleConversionRate(source, initialAmount);
