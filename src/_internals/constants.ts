import { getCiphers } from 'node:crypto';

export const availableCiphers: readonly string[] = getCiphers();
export const defaultEncodingOptions = {
    authTag: 'hex',
    decryptInput: 'hex',
    decryptOutput: 'utf-8',
    encryptInput: 'utf-8',
    encryptOutput: 'hex',
    iv: 'hex',
    key: 'utf-8',
} as const;
