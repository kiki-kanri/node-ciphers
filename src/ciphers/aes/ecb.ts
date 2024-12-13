import type { BinaryLike } from 'node:crypto';
import type { TransformOptions } from 'node:stream';

import type { AESCipherEncodingOptions } from '../../types';

import BaseAESCipher from './base';

export class ECB extends BaseAESCipher {
    constructor(key: BinaryLike, encodingOptions?: AESCipherEncodingOptions) {
        super(key, 'ecb', encodingOptions);
    }

    // @ts-expect-error Allow iv to be null.
    decrypt(encryptedData: BinaryLike, iv?: null, encodingOptions?: AESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
        try {
            return this.getDecipherResult(this.createDecipher(null, decipherOptions), encryptedData, encodingOptions);
        } catch {}
    }

    decryptToJSON<T = any>(encryptedData: BinaryLike, iv?: null, encodingOptions?: AESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
        return this.parseJSON<T>(this.decrypt(encryptedData, iv, encodingOptions, decipherOptions));
    }

    encrypt(data: BinaryLike, encodingOptions?: AESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
        try {
            return {
                data: this.getCipherResult(this.createCipher(null, cipherOptions), data, encodingOptions),
                iv: null,
            };
        } catch {}
    }

    encryptJSON(data: any, encodingOptions?: AESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
        return this.encrypt(JSON.stringify(data), encodingOptions, cipherOptions);
    }
}

export default ECB;
