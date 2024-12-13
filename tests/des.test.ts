import { Buffer } from 'node:buffer';

import { DESCipher } from '../src';
import type BaseDESEncryptAndDecrypt from '../src/ciphers/des/base/encrypt-and-decrypt';

const cipherClasses = [
    DESCipher.CBC,
    DESCipher.CFB,
    DESCipher.CFB1,
    DESCipher.CFB8,
    DESCipher.ECB,
    DESCipher.OFB,
] as const;

const data = 'test';
const jsonData = { value: data };
const keys = {
    64: '01234567',
    128: '0123456789abcdef',
    192: Buffer.from('0123456789abcdef01234567'),
};

describe('des cipher', () => {
    cipherClasses.forEach((CipherClass) => {
        Object.entries(keys).forEach(([
            bits,
            key,
        ]) => {
            if (bits === '128' && CipherClass.name.match(/cfb(1|8)/i)) return;
            describe(`${CipherClass.name} Mode with ${bits} bits key`, () => {
                let cipher: BaseDESEncryptAndDecrypt;
                beforeEach(() => cipher = new CipherClass(key) as BaseDESEncryptAndDecrypt);
                it('should correctly encrypt and decrypt data', () => {
                    const encryptResult = cipher.encrypt(data);
                    expect(encryptResult).toHaveProperty('data');
                    expect(encryptResult).toHaveProperty('iv');
                    const decryptedData = cipher.decrypt(encryptResult!.data, encryptResult!.iv);
                    expect(decryptedData).toBe(data);
                });

                it('should correctly encrypt and decrypt JSON data', () => {
                    const encryptResult = cipher.encryptJSON(jsonData);
                    expect(encryptResult).toHaveProperty('data');
                    expect(encryptResult).toHaveProperty('iv');
                    const decryptedData = cipher.decryptToJSON(encryptResult!.data, encryptResult!.iv);
                    expect(decryptedData).toEqual(jsonData);
                });

                it('should return undefined when decrypting invalid data and iv', () => {
                    const decryptedData = cipher.decrypt('test test', 'test test');
                    expect(decryptedData).toBeUndefined();
                    const decryptedJsonData = cipher.decryptToJSON('test test', 'test test');
                    expect(decryptedJsonData).toBeUndefined();
                });
            });
        });
    });
});
