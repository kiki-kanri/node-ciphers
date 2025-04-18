import type { BinaryLike } from 'node:crypto';

import type { DesCipherEncodingOptions } from '../types';

import { BaseDesEncryptAndDecrypt } from './base/encrypt-and-decrypt';

export class Cfb8 extends BaseDesEncryptAndDecrypt {
    constructor(key: BinaryLike, encodingOptions?: DesCipherEncodingOptions) {
        super(key, 'cfb8', encodingOptions);
    }
}
