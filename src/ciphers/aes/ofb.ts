import type { AESCipherEncodingOptions } from '@/types';
import BaseAESCipher from './base';

export class OFB extends BaseAESCipher {
	constructor(key: Buffer | string, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'ofb', encodingOptions);
	}
}

export default OFB;
