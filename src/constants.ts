import { getCiphers } from 'node:crypto';

export const availableCiphers = Object.freeze<string[]>(getCiphers());
export const defaultEncodingOptions = Object.freeze({
    authTag: 'hex',
    decryptInput: 'hex',
    decryptOutput: 'utf-8',
    encryptInput: 'utf-8',
    encryptOutput: 'hex',
    iv: 'hex',
    key: 'utf-8',
} as const);
