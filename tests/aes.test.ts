import { Buffer } from 'node:buffer';

import { AesCipher } from '../src';
import type {
    Ccm,
    Gcm,
} from '../src/ciphers/aes';
import type BaseAesEncryptAndDecrypt from '../src/ciphers/aes/base/encrypt-and-decrypt';

const cipherClassesAndTestFunctions = [
    [AesCipher.Cbc],
    [
        AesCipher.Ccm,
        hasAuthTagCipherTest,
    ],
    [AesCipher.Cfb],
    [AesCipher.Cfb1],
    [AesCipher.Cfb8],
    [AesCipher.Ctr],
    [AesCipher.Ecb],
    [
        AesCipher.Gcm,
        hasAuthTagCipherTest,
    ],
    [AesCipher.Ofb],
] as const;

const data = 'test';
const jsonData = { value: data };
const keys = {
    128: '0123456789abcdef',
    192: '0123456789abcdef01234567',
    256: Buffer.from('0123456789abcdef0123456789abcdef'),
};

function commonCipherTest(
    CipherClass: new (key: Buffer | string) => BaseAesEncryptAndDecrypt,
    key: Buffer | string,
    bits: string,
) {
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
            const encryptResult = cipher.encryptJson(jsonData);
            expect(encryptResult).toHaveProperty('data');
            expect(encryptResult).toHaveProperty('iv');
            const decryptedData = cipher.decryptToJson(encryptResult!.data, encryptResult!.iv);
            expect(decryptedData).toEqual(jsonData);
        });

        it('should return undefined when decrypting invalid data and iv', () => {
            const cipher = new CipherClass(key);
            const decryptedData = cipher.decrypt('test test', 'test test');
            expect(decryptedData).toBeUndefined();
            const decryptedJsonData = cipher.decryptToJson('test test', 'test test');
            expect(decryptedJsonData).toBeUndefined();
        });
    });
}

function hasAuthTagCipherTest(
    CipherClass: new (key: Buffer | string) => Ccm | Gcm,
    key: Buffer | string,
    bits: string,
) {
    describe(`${CipherClass.name} Mode with ${bits} bits key`, () => {
        it('should correctly encrypt and decrypt data with default authTagLength', () => {
            const cipher = new CipherClass(key);
            const encryptResult = cipher.encrypt(data);
            expect(encryptResult).toHaveProperty('authTag');
            expect(encryptResult).toHaveProperty('data');
            expect(encryptResult).toHaveProperty('iv');
            const decryptedData = cipher.decrypt(encryptResult!.data, encryptResult!.iv, encryptResult!.authTag);
            expect(decryptedData).toBe(data);
        });

        it('should correctly encrypt and decrypt data with custom authTagLength', () => {
            const cipher = new CipherClass(key);
            const authTagLength = 12;
            const encryptResult = cipher.encrypt(data, authTagLength);
            expect(encryptResult).toHaveProperty('authTag');
            expect(encryptResult).toHaveProperty('data');
            expect(encryptResult).toHaveProperty('iv');
            const decryptedData = cipher.decrypt(
                encryptResult!.data,
                encryptResult!.iv,
                encryptResult!.authTag,
                authTagLength,
            );

            expect(decryptedData).toBe(data);
        });

        it('should correctly encrypt and decrypt JSON data', () => {
            const cipher = new CipherClass(key);
            const encryptResult = cipher.encryptJson(jsonData);
            expect(encryptResult).toHaveProperty('data');
            expect(encryptResult).toHaveProperty('iv');
            const decryptedData = cipher.decryptToJson(encryptResult!.data, encryptResult!.iv, encryptResult!.authTag);
            expect(decryptedData).toEqual(jsonData);
        });

        it('should return undefined when decrypting invalid data and iv', () => {
            const cipher = new CipherClass(key);
            const decryptedData = cipher.decrypt('test test', 'test test', 'test test');
            expect(decryptedData).toBeUndefined();
            const decryptedJsonData = cipher.decryptToJson('test test', 'test test', 'test test');
            expect(decryptedJsonData).toBeUndefined();
        });
    });
}

describe('aes cipher', () => {
    cipherClassesAndTestFunctions.forEach(([
        cipherClass,
        testFunction,
    ]) => {
        Object.entries(keys).forEach(([
            bits,
            key,
        ]) => (testFunction || commonCipherTest)(cipherClass as any, key, bits));
    });
});
