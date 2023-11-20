import type { AESCipherEncodingOptions } from '@/types';
import BaseAESEncryptAndDecrypt from './base/encryptAndDecrypt';

export class CFB8 extends BaseAESEncryptAndDecrypt {
	constructor(key: Buffer | string, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'cfb8', encodingOptions);
	}
}

export default CFB8;
