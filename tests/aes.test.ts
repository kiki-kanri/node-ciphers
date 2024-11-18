import { Buffer } from 'node:buffer';

import { AESCipher } from '../src';
import type { CCM, GCM } from '../src/ciphers/aes';
import type BaseAESEncryptAndDecrypt from '../src/ciphers/aes/base/encrypt-and-decrypt';

const cipherClassesAndTestFunctions = [
	[AESCipher.CBC],
	[AESCipher.CCM, hasAuthTagCipherTest],
	[AESCipher.CFB],
	[AESCipher.CFB1],
	[AESCipher.CFB8],
	[AESCipher.CTR],
	[AESCipher.ECB],
	[AESCipher.GCM, hasAuthTagCipherTest],
	[AESCipher.OFB],
] as const;

const data = 'test';
const jsonData = { value: data };
const keys = {
	128: '0123456789abcdef',
	192: '0123456789abcdef01234567',
	256: Buffer.from('0123456789abcdef0123456789abcdef'),
};

function commonCipherTest(CipherClass: new (key: string) => BaseAESEncryptAndDecrypt, key: string, bits: string) {
	describe(`${CipherClass.name} Mode with ${bits} bits key`, () => {
		it('should correctly encrypt and decrypt data', () => {
			const cipher = new CipherClass(key);
			const encryptResult = cipher.encrypt(data);
			expect(encryptResult).toHaveProperty('data');
			expect(encryptResult).toHaveProperty('iv');
			const decryptedData = cipher.decrypt(encryptResult!.data, encryptResult!.iv);
			expect(decryptedData).toBe(data);
		});

		it('should correctly encrypt and decrypt JSON data', () => {
			const cipher = new CipherClass(key);
			const encryptResult = cipher.encryptJSON(jsonData);
			expect(encryptResult).toHaveProperty('data');
			expect(encryptResult).toHaveProperty('iv');
			const decryptedData = cipher.decryptToJSON(encryptResult!.data, encryptResult!.iv);
			expect(decryptedData).toEqual(jsonData);
		});

		it('should return undefined when decrypting invalid data and iv', () => {
			const cipher = new CipherClass(key);
			const decryptedData = cipher.decrypt('test test', 'test test');
			expect(decryptedData).toBeUndefined();
			const decryptedJsonData = cipher.decryptToJSON('test test', 'test test');
			expect(decryptedJsonData).toBeUndefined();
		});
	});
}

function hasAuthTagCipherTest(CipherClass: new (key: string) => CCM | GCM, key: string, bits: string) {
	describe(`${CipherClass.name} Mode with ${bits} bits key`, () => {
		it('should correctly encrypt and decrypt data', () => {
			const cipher = new CipherClass(key);
			const encryptResult = cipher.encrypt(data);
			expect(encryptResult).toHaveProperty('data');
			expect(encryptResult).toHaveProperty('iv');
			const decryptedData = cipher.decrypt(encryptResult!.data, encryptResult!.iv, encryptResult!.authTag);
			expect(decryptedData).toBe(data);
		});

		it('should correctly encrypt and decrypt JSON data', () => {
			const cipher = new CipherClass(key);
			const encryptResult = cipher.encryptJSON(jsonData);
			expect(encryptResult).toHaveProperty('data');
			expect(encryptResult).toHaveProperty('iv');
			const decryptedData = cipher.decryptToJSON(encryptResult!.data, encryptResult!.iv, encryptResult!.authTag);
			expect(decryptedData).toEqual(jsonData);
		});

		it('should return undefined when decrypting invalid data and iv', () => {
			const cipher = new CipherClass(key);
			const decryptedData = cipher.decrypt('test test', 'test test', 'test test');
			expect(decryptedData).toBeUndefined();
			const decryptedJsonData = cipher.decryptToJSON('test test', 'test test', 'test test');
			expect(decryptedJsonData).toBeUndefined();
		});
	});
}

// @ts-expect-error Ignore this error.
describe('aes cipher', () => cipherClassesAndTestFunctions.forEach(([cipherClass, testFunction]) => Object.entries(keys).forEach(([bits, key]) => (testFunction || commonCipherTest)(cipherClass, key, bits))));
