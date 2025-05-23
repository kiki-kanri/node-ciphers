import type { BinaryLike } from 'node:crypto';
import type { TransformOptions } from 'node:stream';

import type {
    AesCipherEncodingOptions,
    EcbEncryptResult,
    Result,
} from '../types';

import { BaseAesCipher } from './base';

export class Ecb extends BaseAesCipher {
    constructor(key: BinaryLike, encodingOptions?: AesCipherEncodingOptions) {
        super(key, 'ecb', encodingOptions);
    }

    decrypt(
        encryptedData: BinaryLike,
        // @ts-expect-error Allow iv to be null.
        iv?: null,
        encodingOptions?: AesCipherEncodingOptions.Decrypt,
        decipherOptions?: TransformOptions,
    ): Result<string> {
        try {
            return this.createOkResult(
                this.getDecipherResult(this.createDecipher(null, decipherOptions), encryptedData, encodingOptions),
            );
        } catch (error) {
            return this.createErrorResult(error);
        }
    }

    decryptToJson<T = any>(
        encryptedData: BinaryLike,
        iv?: null,
        encodingOptions?: AesCipherEncodingOptions.Decrypt,
        decipherOptions?: TransformOptions,
    ): Result<T> {
        const result = this.decrypt(encryptedData, iv, encodingOptions, decipherOptions);
        if (!result.ok) return result;
        return this.parseJson<T>(result.value);
    }

    encrypt(
        data: BinaryLike,
        encodingOptions?: AesCipherEncodingOptions.Encrypt,
        cipherOptions?: TransformOptions,
    ): EcbEncryptResult {
        try {
            return this.createOkResult({
                data: this.getCipherResult(this.createCipher(null, cipherOptions), data, encodingOptions),
                iv: null,
            });
        } catch (error) {
            return this.createErrorResult(error);
        }
    }

    encryptJson(
        data: any,
        encodingOptions?: AesCipherEncodingOptions.Encrypt,
        cipherOptions?: TransformOptions,
    ): EcbEncryptResult {
        try {
            return this.encrypt(JSON.stringify(data), encodingOptions, cipherOptions);
        } catch (error) {
            return this.createErrorResult(error);
        }
    }
}
