import type { BinaryLike } from 'node:crypto';
import type { TransformOptions } from 'node:stream';

import type { DesCipherEncodingOptions } from '../../types';

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
    ) {
        try {
            return this.getDecipherResult(this.createDecipher(null, decipherOptions), encryptedData, encodingOptions);
        } catch {}
    }

    decryptToJson<T = any>(
        encryptedData: BinaryLike,
        iv?: null,
        encodingOptions?: DesCipherEncodingOptions.Decrypt,
        decipherOptions?: TransformOptions,
    ) {
        return this.parseJson<T>(this.decrypt(encryptedData, iv, encodingOptions, decipherOptions));
    }

    encrypt(data: BinaryLike, encodingOptions?: DesCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
        try {
            return {
                data: this.getCipherResult(this.createCipher(null, cipherOptions), data, encodingOptions),
                iv: null,
            };
        } catch {}
    }

    encryptJson(data: any, encodingOptions?: DesCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
        return this.encrypt(JSON.stringify(data), encodingOptions, cipherOptions);
    }
}
