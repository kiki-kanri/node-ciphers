import type { BinaryLike } from 'node:crypto';
import type { TransformOptions } from 'node:stream';

import type {
    DesCipherEncodingOptions,
    Result,
} from '../../types';

import { BaseDesCipher } from './base';

export class Ecb extends BaseDesCipher {
    constructor(key: BinaryLike, encodingOptions?: DesCipherEncodingOptions) {
        super(key, 'ecb', encodingOptions);
    }

    decrypt(
        encryptedData: BinaryLike,
        // @ts-expect-error Allow iv to be null.
        iv?: null,
        encodingOptions?: DesCipherEncodingOptions.Decrypt,
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
        encodingOptions?: DesCipherEncodingOptions.Decrypt,
        decipherOptions?: TransformOptions,
    ) {
        const result = this.decrypt(encryptedData, iv, encodingOptions, decipherOptions);
        if (!result.ok) return result;
        return this.parseJson<T>(result.value);
    }

    encrypt(
        data: BinaryLike,
        encodingOptions?: DesCipherEncodingOptions.Encrypt,
        cipherOptions?: TransformOptions,
    ): Result<{ data: string; iv: null }> {
        try {
            return this.createOkResult({
                data: this.getCipherResult(this.createCipher(null, cipherOptions), data, encodingOptions),
                iv: null,
            });
        } catch (error) {
            return this.createErrorResult(error);
        }
    }

    encryptJson(data: any, encodingOptions?: DesCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
        try {
            return this.encrypt(JSON.stringify(data), encodingOptions, cipherOptions);
        } catch (error) {
            return this.createErrorResult(error);
        }
    }
}
