import type { BinaryLike } from 'node:crypto';

import type { AesCipherEncodingOptions } from '../types';

import { BaseAesEncryptAndDecrypt } from './base/encrypt-and-decrypt';

export class Cfb8 extends BaseAesEncryptAndDecrypt {
    constructor(key: BinaryLike, encodingOptions?: AesCipherEncodingOptions) {
        super(key, 'cfb8', encodingOptions);
    }
}
