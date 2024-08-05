import type { BinaryLike } from 'crypto';

import type { AESCipherEncodingOptions } from '../../types';
import BaseAESEncryptAndDecrypt from './base/encryptAndDecrypt';

export class CFB1 extends BaseAESEncryptAndDecrypt {
	constructor(key: BinaryLike, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'cfb1', encodingOptions);
	}
}

export default CFB1;
