import type { BinaryLike } from 'node:crypto';

import type { DESCipherEncodingOptions } from '../../types';

import BaseDESEncryptAndDecrypt from './base/encrypt-and-decrypt';

export class CFB8 extends BaseDESEncryptAndDecrypt {
    constructor(key: BinaryLike, encodingOptions?: DESCipherEncodingOptions) {
        super(key, 'cfb8', encodingOptions);
    }
}

export default CFB8;
