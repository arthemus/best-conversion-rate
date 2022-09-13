import * as fs from 'fs';

import { Currency } from "../models/models";

const DATA: string = "data/currencies.json"

/**
 * Reading the data file to catch raw data about currency conversion.
 * @returns An array of Currency class with currencies and rates.
 */
export function readData(): Promise<Currency[]> {
    console.debug(`Returning currency data from '${DATA}' file...`)
    const file = fs.readFileSync(DATA);
    const json = JSON.parse(file.toString());
    return Promise.resolve(json);
}
