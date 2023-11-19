import type { AESCipherEncodingOptions } from '@/types';
import BaseAESCipher from './base';

export class CBC extends BaseAESCipher {
	constructor(key: Buffer | string, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'cbc', encodingOptions);
	}
}

export default CBC;
