import { Buffer } from 'node:buffer';

import { DesCipher } from '../src';
import type BaseDesEncryptAndDecrypt from '../src/ciphers/des/base/encrypt-and-decrypt';

const cipherClasses = [
    DesCipher.Cbc,
    DesCipher.Cfb,
    DesCipher.Cfb1,
    DesCipher.Cfb8,
    DesCipher.Ecb,
    DesCipher.Ofb,
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
                let cipher: BaseDesEncryptAndDecrypt;
                beforeEach(() => cipher = new CipherClass(key) as BaseDesEncryptAndDecrypt);
                it('should correctly encrypt and decrypt data', () => {
                    const encryptResult = cipher.encrypt(data);
                    expect(encryptResult).toHaveProperty('data');
                    expect(encryptResult).toHaveProperty('iv');
                    const decryptedData = cipher.decrypt(encryptResult!.data, encryptResult!.iv);
                    expect(decryptedData).toBe(data);
                });

                it('should correctly encrypt and decrypt JSON data', () => {
                    const encryptResult = cipher.encryptJson(jsonData);
                    expect(encryptResult).toHaveProperty('data');
                    expect(encryptResult).toHaveProperty('iv');
                    const decryptedData = cipher.decryptToJson(encryptResult!.data, encryptResult!.iv);
                    expect(decryptedData).toEqual(jsonData);
                });

                it('should return undefined when decrypting invalid data and iv', () => {
                    const decryptedData = cipher.decrypt('test test', 'test test');
                    expect(decryptedData).toBeUndefined();
                    const decryptedJsonData = cipher.decryptToJson('test test', 'test test');
                    expect(decryptedJsonData).toBeUndefined();
                });
            });
        });
    });
});
