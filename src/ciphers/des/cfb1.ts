import type { BinaryLike } from 'crypto';

import type { DESCipherEncodingOptions } from '@/types';
import BaseDESEncryptAndDecrypt from './base/encryptAndDecrypt';

export class CFB1 extends BaseDESEncryptAndDecrypt {
	constructor(key: BinaryLike, encodingOptions?: DESCipherEncodingOptions) {
		super(key, 'cfb1', encodingOptions);
	}
}

export default CFB1;
