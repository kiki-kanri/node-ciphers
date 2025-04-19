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

export function expectErrorName(error: unknown) {
    expect(error).toBeDefined();
    expect(typeof error).toBe('object');
    expect((error as Error).name).toMatch(/^(Error|SyntaxError|TypeError)$/);
}

export function testCommonDecryptInvalidDataAndIv(cipher: Cipher) {
    const decryptedResult = cipher.decrypt('test test', 'test test');
    expect(decryptedResult.ok).toBe(false);
    if (!decryptedResult.ok) expectErrorName(decryptedResult.error);

    const decryptedJsonResult = cipher.decryptToJson('test test', 'test test');
    expect(decryptedJsonResult.ok).toBe(false);
    if (!decryptedJsonResult.ok) expectErrorName(decryptedJsonResult.error);
}

export function testCommonDecryptNonJsonData(cipher: Cipher) {
    // Encrypt
    const encryptResult = cipher.encrypt('!114514!');
    expect(encryptResult.ok).toBe(true);

    // Decrypt
    const decryptResult = cipher.decryptToJson(encryptResult.value!.data, encryptResult.value!.iv);
    expect(decryptResult.ok).toBe(false);
    if (!decryptResult.ok) expectErrorName(decryptResult.error);
}

export function testCommonEncryptDecrypt(cipher: Cipher, data: string) {
    // Encrypt
    const encryptResult = cipher.encrypt(data);
    expect(encryptResult.ok).toBe(true);
    expect(typeof encryptResult.value!.data).toBe('string');
    if (cipher.algorithm.endsWith('ecb')) expect(encryptResult.value!.iv).toBeNull();
    else expect(typeof encryptResult.value!.iv).toBe('string');

    // Decrypt
    const decryptedResult = cipher.decrypt(encryptResult.value!.data, encryptResult.value!.iv);
    expect(decryptedResult.ok).toBe(true);
    expect(decryptedResult.value).toBe(data);
}

export function testCommonEncryptDecryptJson<T>(cipher: Cipher, jsonData: T) {
    // Encrypt
    const encryptResult = cipher.encryptJson(jsonData);
    expect(encryptResult.ok).toBe(true);
    expect(typeof encryptResult.value!.data).toBe('string');
    if (cipher.algorithm.endsWith('ecb')) expect(encryptResult.value!.iv).toBeNull();
    else expect(typeof encryptResult.value!.iv).toBe('string');

    // Decrypt
    const decryptedResult = cipher.decryptToJson<T>(encryptResult.value!.data, encryptResult.value!.iv);
    expect(decryptedResult.ok).toBe(true);
    expect(decryptedResult.value).toEqual(jsonData);
}

export function testEncryptCircularReferenceJson(cipher: Cipher) {
    const circularData: any = {};
    circularData.self = circularData;

    const encryptResult = cipher.encryptJson(circularData);
    expect(encryptResult.ok).toBe(false);
    if (!encryptResult.ok) expectErrorName(encryptResult.error);
}

export function testEncryptInvalidData(cipher: Cipher) {
    const encryptResult = cipher.encrypt(undefined as any);
    expect(encryptResult.ok).toBe(false);
    if (!encryptResult.ok) expectErrorName(encryptResult.error);
}
