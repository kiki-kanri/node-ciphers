import type { BinaryLike } from 'node:crypto';

import type { AesCipherEncodingOptions } from '../types';

import { BaseAesEncryptAndDecrypt } from './base/encrypt-and-decrypt';

export class Cbc extends BaseAesEncryptAndDecrypt {
    constructor(key: BinaryLike, encodingOptions?: AesCipherEncodingOptions) {
        super(key, 'cbc', encodingOptions);
    }
}
