import { readFileSync } from 'fs';
import { resolve } from 'path';

export function parseJSON(file: string) {
    const keyFileContents = readFileSync(resolve(__dirname, file)).toString();
    const asJSON = JSON.parse(keyFileContents);
    return asJSON;
}