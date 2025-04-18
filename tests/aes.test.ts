import { Buffer } from 'node:buffer';

import { AesCiphers } from '../src';
import type {
    Ccm,
    Gcm,
} from '../src/ciphers/aes';
import type { BaseAesEncryptAndDecrypt } from '../src/ciphers/aes/base/encrypt-and-decrypt';

import {
    expectErrorName,
    testCommonDecryptInvalidDataAndIv,
    testCommonDecryptNonJsonData,
    testCommonEncryptDecrypt,
    testCommonEncryptDecryptJson,
    testEncryptCircularReferenceJson,
    testEncryptInvalidData,
} from './helpers';

const cipherClassesAndTestFunctions = [
    [AesCiphers.Cbc],
    [
        AesCiphers.Ccm,
        hasAuthTagCipherTest,
    ],
    [AesCiphers.Cfb],
    [AesCiphers.Cfb1],
    [AesCiphers.Cfb8],
    [AesCiphers.Ctr],
    [AesCiphers.Ecb],
    [
        AesCiphers.Gcm,
        hasAuthTagCipherTest,
    ],
    [AesCiphers.Ofb],
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
            testCommonEncryptDecrypt(cipher, data);
        });

        it('should correctly encrypt and decrypt JSON data', () => {
            const cipher = new CipherClass(key);
            testCommonEncryptDecryptJson(cipher, jsonData);
        });

        it('should return error when encrypting invalid data', () => {
            const cipher = new CipherClass(key);
            testEncryptInvalidData(cipher);
        });

        it('should return error when encrypting JSON with circular reference', () => {
            const cipher = new CipherClass(key);
            testEncryptCircularReferenceJson(cipher);
        });

        it('should return error when decrypting invalid data and iv', () => {
            const cipher = new CipherClass(key);
            testCommonDecryptInvalidDataAndIv(cipher);
        });

        it('should return error when decrypting non-JSON data with decryptToJson', () => {
            const cipher = new CipherClass(key);
            testCommonDecryptNonJsonData(cipher);
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
            expect(encryptResult.ok).toBe(true);
            if (encryptResult.ok) {
                expect(typeof encryptResult.value.authTag).toBe('string');
                if (cipher.algorithm.endsWith('ccm')) expect(encryptResult.value.authTagLength).toBe(16);
                else expect(encryptResult.value.authTagLength).toBeUndefined();
                expect(typeof encryptResult.value.data).toBe('string');
                expect(typeof encryptResult.value.iv).toBe('string');

                const decryptedResult = cipher.decrypt(
                    encryptResult.value.data,
                    encryptResult.value.iv,
                    encryptResult.value.authTag,
                );

                expect(decryptedResult.ok).toBe(true);
                if (decryptedResult.ok) expect(decryptedResult.value).toBe(data);
            }
        });

        it('should correctly encrypt and decrypt data with custom authTagLength', () => {
            const cipher = new CipherClass(key);
            const authTagLength = 12;

            const encryptResult = cipher.encrypt(data, authTagLength);
            if (encryptResult.ok) {
                expect(typeof encryptResult.value.authTag).toBe('string');
                expect(encryptResult.value.authTagLength).toBe(authTagLength);
                expect(typeof encryptResult.value.data).toBe('string');
                expect(typeof encryptResult.value.iv).toBe('string');

                const decryptedResult = cipher.decrypt(
                    encryptResult.value.data,
                    encryptResult.value.iv,
                    encryptResult.value.authTag,
                    authTagLength,
                );

                expect(decryptedResult.ok).toBe(true);
                if (decryptedResult.ok) expect(decryptedResult.value).toBe(data);
            }
        });

        it('should correctly encrypt and decrypt JSON data', () => {
            const cipher = new CipherClass(key);

            const encryptResult = cipher.encryptJson(jsonData);
            expect(encryptResult.ok).toBe(true);
            if (encryptResult.ok) {
                expect(typeof encryptResult.value.data).toBe('string');
                expect(typeof encryptResult.value.iv).toBe('string');

                const decryptedResult = cipher.decryptToJson(
                    encryptResult.value.data,
                    encryptResult.value.iv,
                    encryptResult.value.authTag,
                );

                expect(decryptedResult.ok).toBe(true);
                if (decryptedResult.ok) expect(decryptedResult.value).toEqual(jsonData);
            }
        });

        it('should return error when encrypting invalid data', () => {
            const cipher = new CipherClass(key);
            testEncryptInvalidData(cipher);
        });

        it('should return error when encrypting JSON with circular reference', () => {
            const cipher = new CipherClass(key);
            testEncryptCircularReferenceJson(cipher);
        });

        it('should return error when decrypting invalid data and iv', () => {
            const cipher = new CipherClass(key);

            const decryptedResult = cipher.decrypt('test test', 'test test', 'test test');
            expect(decryptedResult.ok).toBe(false);
            if (!decryptedResult.ok) expectErrorName(decryptedResult.error);

            const decryptedJsonResult = cipher.decryptToJson('test test', 'test test', 'test test');
            expect(decryptedJsonResult.ok).toBe(false);
            if (!decryptedJsonResult.ok) expectErrorName(decryptedJsonResult.error);
        });

        it('should return error when decrypting non-JSON data with decryptToJson', () => {
            const cipher = new CipherClass(key);

            const encryptResult = cipher.encrypt(data);
            expect(encryptResult.ok).toBe(true);
            if (encryptResult.ok) {
                const decryptResult = cipher.decryptToJson(
                    encryptResult.value.data,
                    encryptResult.value.iv,
                    encryptResult.value.authTag,
                );

                expect(decryptResult.ok).toBe(false);
                if (!decryptResult.ok) expectErrorName(decryptResult.error);
            }
        });
    });
}

describe('aes cipher', () => {
    // eslint-disable-next-line style/array-bracket-newline, style/array-element-newline
    cipherClassesAndTestFunctions.forEach(([cipherClass, testFunction]) => {
        // eslint-disable-next-line style/array-bracket-newline, style/array-element-newline
        Object.entries(keys).forEach(([bits, key]) => {
            (testFunction || commonCipherTest)(cipherClass as any, key, bits);
        });
    });
});
