import type { BinaryLike } from 'crypto';

import type { DESCipherEncodingOptions } from '../../types';
import BaseDESEncryptAndDecrypt from './base/encrypt-and-decrypt';

export class CBC extends BaseDESEncryptAndDecrypt {
	constructor(key: BinaryLike, encodingOptions?: DESCipherEncodingOptions) {
		super(key, 'cbc', encodingOptions);
	}
}

export default CBC;
