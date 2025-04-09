import { randomBytes } from 'node:crypto';
import type { BinaryLike } from 'node:crypto';
import type { TransformOptions } from 'node:stream';

import type { DesCipherEncodingOptions } from '../../../types';

import { BaseDesCipher } from '.';

export abstract class BaseDesEncryptAndDecrypt extends BaseDesCipher {
    decrypt(
        encryptedData: BinaryLike,
        iv: BinaryLike,
        encodingOptions?: DesCipherEncodingOptions.Decrypt,
        decipherOptions?: TransformOptions,
    ) {
        try {
            const decipher = this.createDecipher(
                this.dataToBuffer(iv, encodingOptions?.iv || this.encodingOptions.iv),
                decipherOptions,
            );

            return this.getDecipherResult(decipher, encryptedData, encodingOptions);
        } catch {}
    }

    decryptToJson<T = any>(
        encryptedData: BinaryLike,
        iv: BinaryLike,
        encodingOptions?: DesCipherEncodingOptions.Decrypt,
        decipherOptions?: TransformOptions,
    ) {
        return this.parseJson<T>(this.decrypt(encryptedData, iv, encodingOptions, decipherOptions));
    }

    encrypt(data: BinaryLike, encodingOptions?: DesCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
        const iv = randomBytes(8);
        try {
            return {
                data: this.getCipherResult(this.createCipher(iv, cipherOptions), data, encodingOptions),
                iv: iv.toString(encodingOptions?.iv || this.encodingOptions.iv),
            };
        } catch {}
    }

    encryptJson(data: any, encodingOptions?: DesCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
        return this.encrypt(JSON.stringify(data), encodingOptions, cipherOptions);
    }
}
