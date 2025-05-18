import type { ExpectStatic } from 'vitest';

import type {
    BaseEncryptResult,
    EcbEncryptResult,
    Result,
} from '../src/types';

export interface Cipher {
    algorithm: string;
    decrypt: (data: string, iv: null | string) => Result<string>;
    decryptToJson: <T = any>(data: string, iv: null | string) => Result<T>;
    encrypt: (data: string) => BaseEncryptResult | EcbEncryptResult;
    encryptJson: (data: any) => BaseEncryptResult | EcbEncryptResult;
}

export function testCommonDecryptInvalidDataAndIv(expect: ExpectStatic, cipher: Cipher) {
    const decryptResult = cipher.decrypt('test test', 'test test');
    expect(decryptResult.ok).toBe(false);
    if (!decryptResult.ok) expect(decryptResult.error).toBeInstanceOf(Error);

    const decryptedJsonResult = cipher.decryptToJson('test test', 'test test');
    expect(decryptedJsonResult.ok).toBe(false);
    if (!decryptedJsonResult.ok) expect(decryptedJsonResult.error).toBeInstanceOf(Error);
}

export function testCommonDecryptNonJsonData(expect: ExpectStatic, cipher: Cipher) {
    // Encrypt
    const encryptResult = cipher.encrypt('!114514!');
    expect(encryptResult.ok).toBe(true);

    // Decrypt
    const decryptResult = cipher.decryptToJson(encryptResult.value!.data, encryptResult.value!.iv);
    expect(decryptResult.ok).toBe(false);
    if (!decryptResult.ok) expect(decryptResult.error).toBeInstanceOf(SyntaxError);
}

export function testCommonEncryptDecrypt(expect: ExpectStatic, cipher: Cipher, data: string) {
    // Encrypt
    const encryptResult = cipher.encrypt(data);
    expect(encryptResult.ok).toBe(true);
    expect(typeof encryptResult.value!.data).toBe('string');
    if (cipher.algorithm.endsWith('ecb')) expect(encryptResult.value!.iv).toBeNull();
    else expect(typeof encryptResult.value!.iv).toBe('string');

    // Decrypt
    const decryptResult = cipher.decrypt(encryptResult.value!.data, encryptResult.value!.iv);
    expect(decryptResult.ok).toBe(true);
    expect(decryptResult.value).toBe(data);
}

export function testCommonEncryptDecryptJson<T>(expect: ExpectStatic, cipher: Cipher, jsonData: T) {
    // Encrypt
    const encryptResult = cipher.encryptJson(jsonData);
    expect(encryptResult.ok).toBe(true);
    expect(typeof encryptResult.value!.data).toBe('string');
    if (cipher.algorithm.endsWith('ecb')) expect(encryptResult.value!.iv).toBeNull();
    else expect(typeof encryptResult.value!.iv).toBe('string');

    // Decrypt
    const decryptResult = cipher.decryptToJson<T>(encryptResult.value!.data, encryptResult.value!.iv);
    expect(decryptResult.ok).toBe(true);
    expect(decryptResult.value).toEqual(jsonData);
}

export function testEncryptCircularReferenceJson(expect: ExpectStatic, cipher: Cipher) {
    const circularData: any = {};
    circularData.self = circularData;

    const encryptResult = cipher.encryptJson(circularData);
    expect(encryptResult.ok).toBe(false);
    if (!encryptResult.ok) expect(encryptResult.error).toBeInstanceOf(TypeError);
}

export function testEncryptInvalidData(expect: ExpectStatic, cipher: Cipher) {
    const encryptResult = cipher.encrypt(undefined as any);
    expect(encryptResult.ok).toBe(false);
    if (!encryptResult.ok) expect(encryptResult.error).toBeInstanceOf(TypeError);
}
