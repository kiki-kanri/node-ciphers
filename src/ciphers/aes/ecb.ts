import type { BinaryLike } from 'node:crypto';
import type { TransformOptions } from 'node:stream';

import type { AesCipherEncodingOptions } from '../../types';

import BaseAesCipher from './base';

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
    ) {
        try {
            return this.getDecipherResult(this.createDecipher(null, decipherOptions), encryptedData, encodingOptions);
        } catch {}
    }

    decryptToJson<T = any>(
        encryptedData: BinaryLike,
        iv?: null,
        encodingOptions?: AesCipherEncodingOptions.Decrypt,
        decipherOptions?: TransformOptions,
    ) {
        return this.parseJson<T>(this.decrypt(encryptedData, iv, encodingOptions, decipherOptions));
    }

    encrypt(data: BinaryLike, encodingOptions?: AesCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
        try {
            return {
                data: this.getCipherResult(this.createCipher(null, cipherOptions), data, encodingOptions),
                iv: null,
            };
        } catch {}
    }

    encryptJson(data: any, encodingOptions?: AesCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
        return this.encrypt(JSON.stringify(data), encodingOptions, cipherOptions);
    }
}

export default Ecb;
