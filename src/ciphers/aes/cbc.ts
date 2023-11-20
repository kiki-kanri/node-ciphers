import type { AESCipherEncodingOptions } from '@/types';
import BaseAESEncryptAndDecrypt from './base/encryptAndDecrypt';

export class CBC extends BaseAESEncryptAndDecrypt {
	constructor(key: Buffer | string, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'cbc', encodingOptions);
	}
}

export default CBC;
