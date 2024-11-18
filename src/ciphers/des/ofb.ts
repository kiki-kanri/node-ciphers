import type { BinaryLike } from 'node:crypto';

import type { DESCipherEncodingOptions } from '../../types';

import BaseDESEncryptAndDecrypt from './base/encrypt-and-decrypt';

export class OFB extends BaseDESEncryptAndDecrypt {
	constructor(key: BinaryLike, encodingOptions?: DESCipherEncodingOptions) {
		super(key, 'ofb', encodingOptions);
	}
}

export default OFB;
