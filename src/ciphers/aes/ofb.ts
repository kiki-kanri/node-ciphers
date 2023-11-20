import type { AESCipherEncodingOptions } from '@/types';
import BaseAESEncryptAndDecrypt from './base/encryptAndDecrypt';

export class OFB extends BaseAESEncryptAndDecrypt {
	constructor(key: Buffer | string, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'ofb', encodingOptions);
	}
}

export default OFB;
