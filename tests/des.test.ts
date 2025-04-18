import { Buffer } from 'node:buffer';

import { DesCiphers } from '../src';
import { BaseDesCipher } from '../src/ciphers/des/base';
import type { BaseDesEncryptAndDecrypt } from '../src/ciphers/des/base/encrypt-and-decrypt';

import {
    testCommonDecryptInvalidDataAndIv,
    testCommonDecryptNonJsonData,
    testCommonEncryptDecrypt,
    testCommonEncryptDecryptJson,
    testEncryptCircularReferenceJson,
    testEncryptInvalidData,
} from './helpers';

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

describe('des cipher', () => {
    it('should throw error when creating cipher with invalid key length', () => {
        expect(() => {
            // eslint-disable-next-line no-new
            new TestCipher('', 'cbc');
        }).toThrow();
    });

    it('should throw error when creating cipher with invalid mode', () => {
        expect(() => {
            // eslint-disable-next-line no-new
            new TestCipher(keys['64'], '' as any);
        }).toThrow();
    });

    cipherClasses.forEach((CipherClass) => {
        // eslint-disable-next-line style/array-bracket-newline, style/array-element-newline
        Object.entries(keys).forEach(([bits, key]) => {
            if (bits === '128' && CipherClass.name.match(/cfb(1|8)/i)) return;
            describe(`${CipherClass.name} Mode with ${bits} bits key`, () => {
                let cipher: BaseDesEncryptAndDecrypt;
                beforeEach(() => cipher = new CipherClass(key) as BaseDesEncryptAndDecrypt);
                it('should correctly encrypt and decrypt data', () => testCommonEncryptDecrypt(cipher, data));
                it('should correctly encrypt and decrypt JSON data', () => {
                    testCommonEncryptDecryptJson(cipher, jsonData);
                });

                it('should return error when encrypting invalid data', () => testEncryptInvalidData(cipher));
                it('should return error when encrypting JSON with circular reference', () => {
                    testEncryptCircularReferenceJson(cipher);
                });

                it('should return error when decrypting invalid data and iv', () => {
                    testCommonDecryptInvalidDataAndIv(cipher);
                });

                it('should return error when decrypting non-JSON data with decryptToJson', () => {
                    testCommonDecryptNonJsonData(cipher);
                });
            });
        });
    });
});
