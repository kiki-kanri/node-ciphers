import type { BinaryLike } from 'crypto';

import type { DESCipherEncodingOptions } from '../../types';
import BaseDESEncryptAndDecrypt from './base/encryptAndDecrypt';

export class CFB8 extends BaseDESEncryptAndDecrypt {
	constructor(key: BinaryLike, encodingOptions?: DESCipherEncodingOptions) {
		super(key, 'cfb8', encodingOptions);
	}
}

export default CFB8;
