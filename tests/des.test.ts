import { Buffer } from 'node:buffer';

import {
    describe,
    it,
} from 'vitest';

import * as DesCiphers from '../src/des';
import { BaseDesCipher } from '../src/des/_internals/base';
import type { BaseDesEncryptAndDecrypt } from '../src/des/_internals/base/encrypt-and-decrypt';

import {
    testCommonDecryptInvalidDataAndIv,
    testCommonDecryptNonJsonData,
    testCommonEncryptDecrypt,
    testCommonEncryptDecryptJson,
    testEncryptCircularReferenceJson,
    testEncryptInvalidData,
} from './helpers';
import type { Cipher } from './helpers';

class TestCipher extends BaseDesCipher {}

const cipherClasses = [
    DesCiphers.Cbc,
    DesCiphers.Cfb,
    DesCiphers.Cfb1,
    DesCiphers.Cfb8,
    DesCiphers.Ecb,
    DesCiphers.Ofb,
] as const;

const data = 'test';
const jsonData = { value: data };
const keys = {
    64: '01234567',
    128: '0123456789abcdef',
    192: Buffer.from('0123456789abcdef01234567'),
};

describe.concurrent('des cipher', () => {
    it('should throw error when creating cipher with invalid key length', ({ expect }) => {
        expect(() => {
            // eslint-disable-next-line no-new
            new TestCipher('', 'cbc');
        }).toThrow();
    });

    it('should throw error when creating cipher with invalid mode', ({ expect }) => {
        expect(() => {
            // eslint-disable-next-line no-new
            new TestCipher(keys['64'], '' as any);
        }).toThrow();
    });

    cipherClasses.forEach((CipherClass) => {
        Object.entries(keys).forEach(([bits, key]) => {
            if (bits === '128' && CipherClass.name.match(/cfb(1|8)/i)) return;
            describe.concurrent(`${CipherClass.name} Mode with ${bits} bits key`, () => {
                it('should correctly encrypt and decrypt data', ({ expect }) => {
                    const cipher = new CipherClass(key) as BaseDesEncryptAndDecrypt;
                    testCommonEncryptDecrypt(expect, cipher as Cipher, data);
                });

                it('should correctly encrypt and decrypt JSON data', ({ expect }) => {
                    const cipher = new CipherClass(key) as BaseDesEncryptAndDecrypt;
                    testCommonEncryptDecryptJson(expect, cipher as Cipher, jsonData);
                });

                it('should return error when encrypting invalid data', ({ expect }) => {
                    const cipher = new CipherClass(key) as BaseDesEncryptAndDecrypt;
                    testEncryptInvalidData(expect, cipher as Cipher);
                });

                it('should return error when encrypting JSON with circular reference', ({ expect }) => {
                    const cipher = new CipherClass(key) as BaseDesEncryptAndDecrypt;
                    testEncryptCircularReferenceJson(expect, cipher as Cipher);
                });

                it('should return error when decrypting invalid data and iv', ({ expect }) => {
                    const cipher = new CipherClass(key) as BaseDesEncryptAndDecrypt;
                    testCommonDecryptInvalidDataAndIv(expect, cipher as Cipher);
                });

                it('should return error when decrypting non-JSON data with decryptToJson', ({ expect }) => {
                    const cipher = new CipherClass(key) as BaseDesEncryptAndDecrypt;
                    testCommonDecryptNonJsonData(expect, cipher as Cipher);
                });
            });
        });
    });
});
