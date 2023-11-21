import { getCiphers } from 'crypto';

export const availableCiphers: Readonly<string[]> = getCiphers();
export const defaultEncodingOptions = {
	authTag: 'hex',
	decryptInput: 'hex',
	decryptOutput: 'utf8',
	encryptInput: 'utf8',
	encryptOutput: 'hex',
	key: 'utf8',
	iv: 'hex'
} as const;
