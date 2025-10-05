import type { BinaryLike } from 'node:crypto';

import type { DesCipherEncodingOptions } from '../types';

import { BaseDesEncryptAndDecrypt } from './_internals/base/encrypt-and-decrypt';

export class Ofb extends BaseDesEncryptAndDecrypt {
    constructor(key: BinaryLike, encodingOptions?: DesCipherEncodingOptions) {
        super(key, 'ofb', encodingOptions);
    }
}
