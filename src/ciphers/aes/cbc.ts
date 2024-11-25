import type { BinaryLike } from 'node:crypto';

import type { AESCipherEncodingOptions } from '../../types';

import BaseAESEncryptAndDecrypt from './base/encrypt-and-decrypt';

export class CBC extends BaseAESEncryptAndDecrypt {
    constructor(key: BinaryLike, encodingOptions?: AESCipherEncodingOptions) {
        super(key, 'cbc', encodingOptions);
    }
}

export default CBC;
