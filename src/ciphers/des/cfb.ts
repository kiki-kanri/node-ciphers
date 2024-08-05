import type { BinaryLike } from 'crypto';

import type { DESCipherEncodingOptions } from '../../types';
import BaseDESEncryptAndDecrypt from './base/encryptAndDecrypt';

export class CFB extends BaseDESEncryptAndDecrypt {
	constructor(key: BinaryLike, encodingOptions?: DESCipherEncodingOptions) {
		super(key, 'cfb', encodingOptions);
	}
}

export default CFB;
