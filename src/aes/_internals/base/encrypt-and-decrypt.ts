import { randomBytes } from 'node:crypto';
import type { BinaryLike } from 'node:crypto';
import type { TransformOptions } from 'node:stream';

import type {
    AesCipherEncodingOptions,
    BaseEncryptResult,
    Result,
} from '@/types';

import { BaseAesCipher } from './';

export abstract class BaseAesEncryptAndDecrypt extends BaseAesCipher {
    decrypt(
        encryptedData: BinaryLike,
        iv: BinaryLike,
        encodingOptions?: AesCipherEncodingOptions.Decrypt,
        decipherOptions?: TransformOptions,
    ): Result<string> {
        try {
            const decipher = this.createDecipher(
                this.dataToBuffer(iv, encodingOptions?.iv || this.encodingOptions.iv),
                decipherOptions,
            );

            return this.createOkResult(this.getDecipherResult(decipher, encryptedData, encodingOptions));
        } catch (error) {
            return this.createErrorResult(error);
        }
    }

    decryptToJson<T = any>(
        encryptedData: BinaryLike,
        iv: BinaryLike,
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
    ): BaseEncryptResult {
        const iv = randomBytes(16);
        try {
            return this.createOkResult({
                data: this.getCipherResult(this.createCipher(iv, cipherOptions), data, encodingOptions),
                iv: iv.toString(encodingOptions?.iv || this.encodingOptions.iv),
            });
        } catch (error) {
            return this.createErrorResult(error);
        }
    }

    encryptJson(
        data: any,
        encodingOptions?: AesCipherEncodingOptions.Encrypt,
        cipherOptions?: TransformOptions,
    ): BaseEncryptResult {
        try {
            return this.encrypt(JSON.stringify(data), encodingOptions, cipherOptions);
        } catch (error) {
            return this.createErrorResult(error);
        }
    }
}
