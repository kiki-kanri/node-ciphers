import type { BinaryLike } from 'crypto';

import type { DESCipherEncodingOptions } from '../../types';
import BaseDESEncryptAndDecrypt from './base/encryptAndDecrypt';

export class OFB extends BaseDESEncryptAndDecrypt {
	constructor(key: BinaryLike, encodingOptions?: DESCipherEncodingOptions) {
		super(key, 'ofb', encodingOptions);
	}
}

export default OFB;
