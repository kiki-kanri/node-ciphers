import { randomBytes } from 'node:crypto';
import type { BinaryLike } from 'node:crypto';
import type { TransformOptions } from 'node:stream';

import type {
    HasAuthTagAesCipherEncodingOptions,
    Result,
} from '../types';

import { BaseAesCipher } from './base';

type AvailableIvLength = 7 | 8 | 9 | 10 | 11 | 12 | 13;

export class Ccm extends BaseAesCipher<HasAuthTagAesCipherEncodingOptions> {
    readonly #authTagLength: number;
    readonly #ivLength: AvailableIvLength;

    constructor(
        key: BinaryLike,
        encodingOptions?: HasAuthTagAesCipherEncodingOptions,
        authTagLength: number = 16,
        ivLength: AvailableIvLength = 12,
    ) {
        super(key, 'ccm', encodingOptions);
        this.#authTagLength = authTagLength;
        this.#ivLength = ivLength;
    }

    decrypt(
        encryptedData: BinaryLike,
        iv: BinaryLike,
        authTag: BinaryLike,
        authTagLength: number = this.#authTagLength,
        encodingOptions?: HasAuthTagAesCipherEncodingOptions.Decrypt,
        decipherOptions?: TransformOptions,
    ): Result<string> {
        try {
            const decipher = this.createDecipher(
                this.dataToBuffer(iv, encodingOptions?.iv || this.encodingOptions.iv),
                {
                    authTagLength,
                    ...decipherOptions,
                },
            );

            decipher.setAuthTag(this.dataToBuffer(authTag, encodingOptions?.authTag || this.encodingOptions.authTag));
            return this.createOkResult(this.getDecipherResult(decipher, encryptedData, encodingOptions));
        } catch (error) {
            return this.createErrorResult(error);
        }
    }

    decryptToJson<T = any>(
        encryptedData: BinaryLike,
        iv: BinaryLike,
        authTag: BinaryLike,
        authTagLength: number = this.#authTagLength,
        encodingOptions?: HasAuthTagAesCipherEncodingOptions.Decrypt,
        decipherOptions?: TransformOptions,
    ): Result<T> {
        const result = this.decrypt(encryptedData, iv, authTag, authTagLength, encodingOptions, decipherOptions);
        if (!result.ok) return result;
        return this.parseJson<T>(result.value);
    }

    encrypt(
        data: BinaryLike,
        authTagLength: number = this.#authTagLength,
        ivLength: AvailableIvLength = this.#ivLength,
        encodingOptions?: HasAuthTagAesCipherEncodingOptions.Encrypt,
        cipherOptions?: TransformOptions,
    ): Result<{ authTag: string; authTagLength: number; data: string; iv: string }> {
        const iv = randomBytes(ivLength);
        try {
            const cipher = this.createCipher(
                iv,
                {
                    authTagLength,
                    ...cipherOptions,
                },
            );

            const encryptedData = this.getCipherResult(cipher, data, encodingOptions);
            return this.createOkResult({
                authTag: cipher.getAuthTag().toString(encodingOptions?.authTag || this.encodingOptions.authTag),
                authTagLength,
                data: encryptedData,
                iv: iv.toString(encodingOptions?.iv || this.encodingOptions.iv),
            });
        } catch (error) {
            return this.createErrorResult(error);
        }
    }

    encryptJson(
        data: any,
        authTagLength: number = this.#authTagLength,
        ivLength: AvailableIvLength = this.#ivLength,
        encodingOptions?: HasAuthTagAesCipherEncodingOptions.Encrypt,
        cipherOptions?: TransformOptions,
    ): Result<{ authTag: string; authTagLength: number; data: string; iv: string }> {
        try {
            return this.encrypt(JSON.stringify(data), authTagLength, ivLength, encodingOptions, cipherOptions);
        } catch (error) {
            return this.createErrorResult(error);
        }
    }
}
