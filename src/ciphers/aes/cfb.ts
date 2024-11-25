import type { BinaryLike } from 'node:crypto';

import type { AESCipherEncodingOptions } from '../../types';

import BaseAESEncryptAndDecrypt from './base/encrypt-and-decrypt';

export class CFB extends BaseAESEncryptAndDecrypt {
    constructor(key: BinaryLike, encodingOptions?: AESCipherEncodingOptions) {
        super(key, 'cfb', encodingOptions);
    }
}

export default CFB;
