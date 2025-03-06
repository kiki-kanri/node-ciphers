import type { BinaryLike } from 'node:crypto';

import type { DesCipherEncodingOptions } from '../../types';

import BaseDesEncryptAndDecrypt from './base/encrypt-and-decrypt';

export class Cbc extends BaseDesEncryptAndDecrypt {
    constructor(key: BinaryLike, encodingOptions?: DesCipherEncodingOptions) {
        super(key, 'cbc', encodingOptions);
    }
}

export default Cbc;
