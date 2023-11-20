import type { AESCipherEncodingOptions } from '@/types';
import BaseAESEncryptAndDecrypt from './base/encryptAndDecrypt';

export class CFB extends BaseAESEncryptAndDecrypt {
	constructor(key: Buffer | string, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'cfb', encodingOptions);
	}
}

export default CFB;
