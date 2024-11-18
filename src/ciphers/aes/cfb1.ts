import type { BinaryLike } from 'node:crypto';

import type { AESCipherEncodingOptions } from '../../types';

import BaseAESEncryptAndDecrypt from './base/encrypt-and-decrypt';

export class CFB1 extends BaseAESEncryptAndDecrypt {
	constructor(key: BinaryLike, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'cfb1', encodingOptions);
	}
}

export default CFB1;
