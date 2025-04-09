import { randomBytes } from 'node:crypto';
import type { BinaryLike } from 'node:crypto';
import type { TransformOptions } from 'node:stream';

import type { HasAuthTagAesCipherEncodingOptions } from '../../types';

import { BaseAesCipher } from './base';

export class Gcm extends BaseAesCipher<HasAuthTagAesCipherEncodingOptions> {
    readonly #ivLength: number;

    constructor(key: BinaryLike, encodingOptions?: HasAuthTagAesCipherEncodingOptions, ivLength: number = 12) {
        super(key, 'gcm', encodingOptions);
        this.#ivLength = ivLength;
    }

    decrypt(
        encryptedData: BinaryLike,
        iv: BinaryLike,
        authTag: BinaryLike,
        authTagLength?: number,
        encodingOptions?: HasAuthTagAesCipherEncodingOptions.Decrypt,
        decipherOptions?: TransformOptions,
    ) {
        try {
            const decipher = this.createDecipher(
                this.dataToBuffer(iv, encodingOptions?.iv || this.encodingOptions.iv),
                {
                    authTagLength,
                    ...decipherOptions,
                },
            );

            decipher.setAuthTag(this.dataToBuffer(authTag, encodingOptions?.authTag || this.encodingOptions.authTag));
            return this.getDecipherResult(decipher, encryptedData, encodingOptions);
        } catch {}
    }

    decryptToJson<T = any>(
        encryptedData: BinaryLike,
        iv: BinaryLike,
        authTag: BinaryLike,
        authTagLength?: number,
        encodingOptions?: HasAuthTagAesCipherEncodingOptions.Decrypt,
        decipherOptions?: TransformOptions,
    ) {
        return this.parseJson<T>(
            this.decrypt(encryptedData, iv, authTag, authTagLength, encodingOptions, decipherOptions),
        );
    }

    encrypt(
        data: BinaryLike,
        authTagLength?: number,
        ivLength: number = this.#ivLength,
        encodingOptions?: HasAuthTagAesCipherEncodingOptions.Encrypt,
        cipherOptions?: TransformOptions,
    ) {
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
            return {
                authTag: cipher.getAuthTag().toString(encodingOptions?.authTag || this.encodingOptions.authTag),
                authTagLength,
                data: encryptedData,
                iv: iv.toString(encodingOptions?.iv || this.encodingOptions.iv),
            };
        } catch {}
    }

    encryptJson(
        data: any,
        authTagLength?: number,
        ivLength: number = this.#ivLength,
        encodingOptions?: HasAuthTagAesCipherEncodingOptions.Encrypt,
        cipherOptions?: TransformOptions,
    ) {
        return this.encrypt(JSON.stringify(data), authTagLength, ivLength, encodingOptions, cipherOptions);
    }
}
