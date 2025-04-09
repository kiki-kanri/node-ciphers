import type { BinaryLike } from 'node:crypto';

import type { AesCipherEncodingOptions } from '../../types';

import { BaseAesEncryptAndDecrypt } from './base/encrypt-and-decrypt';

export class Ctr extends BaseAesEncryptAndDecrypt {
    constructor(key: BinaryLike, encodingOptions?: AesCipherEncodingOptions) {
        super(key, 'ctr', encodingOptions);
    }
}
