import { Zip } from './types';

let data: Zip[];

export async function getZipCodes() {
    if (!data) {
        data = require('../src/data.json');
    }
    return data;
}
