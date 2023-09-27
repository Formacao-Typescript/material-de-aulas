import { readFileSync } from 'node:fs';
import * as crypto from 'node:crypto';
import path from 'node:path';
export default function read(file) {
    return readFileSync(file, 'utf8');
}
export function foo() {
    console.log('foo', crypto.createHash('md5').update(path.resolve(__dirname, '29-esm.ts')).digest('hex'));
}
export const bar = 123;
