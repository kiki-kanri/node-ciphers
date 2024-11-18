import type { BinaryLike } from 'node:crypto';

import type { AESCipherEncodingOptions } from '../../types';

import BaseAESEncryptAndDecrypt from './base/encrypt-and-decrypt';

export class CFB8 extends BaseAESEncryptAndDecrypt {
	constructor(key: BinaryLike, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'cfb8', encodingOptions);
	}
}

export default CFB8;
