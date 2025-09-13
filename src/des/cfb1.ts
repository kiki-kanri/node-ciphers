import type { BinaryLike } from 'node:crypto';

import type { DesCipherEncodingOptions } from '@/types';

import { BaseDesEncryptAndDecrypt } from './_internals/base/encrypt-and-decrypt';

export class Cfb1 extends BaseDesEncryptAndDecrypt {
    constructor(key: BinaryLike, encodingOptions?: DesCipherEncodingOptions) {
        super(key, 'cfb1', encodingOptions);
    }
}
