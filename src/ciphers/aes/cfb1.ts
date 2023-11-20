import type { AESCipherEncodingOptions } from '@/types';
import BaseAESEncryptAndDecrypt from './base/encryptAndDecrypt';

export class CFB1 extends BaseAESEncryptAndDecrypt {
	constructor(key: Buffer | string, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'cfb1', encodingOptions);
	}
}

export default CFB1;
