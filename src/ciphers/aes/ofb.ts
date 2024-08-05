import type { BinaryLike } from 'crypto';

import type { AESCipherEncodingOptions } from '../../types';
import BaseAESEncryptAndDecrypt from './base/encrypt-and-decrypt';

export class OFB extends BaseAESEncryptAndDecrypt {
	constructor(key: BinaryLike, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'ofb', encodingOptions);
	}
}

export default OFB;
