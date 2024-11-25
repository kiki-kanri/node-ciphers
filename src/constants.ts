import { getCiphers } from 'node:crypto';

export const availableCiphers = Object.freeze<string[]>(getCiphers());
export const defaultEncodingOptions = Object.freeze({
    authTag: 'hex',
    decryptInput: 'hex',
    decryptOutput: 'utf8',
    encryptInput: 'utf8',
    encryptOutput: 'hex',
    iv: 'hex',
    key: 'utf8',
} as const);
