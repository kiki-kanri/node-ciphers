import type { BinaryLike } from 'node:crypto';

import type { AesCipherEncodingOptions } from '@/types';

import { BaseAesEncryptAndDecrypt } from './_internals/base/encrypt-and-decrypt';

export class Ofb extends BaseAesEncryptAndDecrypt {
    constructor(key: BinaryLike, encodingOptions?: AesCipherEncodingOptions) {
        super(key, 'ofb', encodingOptions);
    }
}
