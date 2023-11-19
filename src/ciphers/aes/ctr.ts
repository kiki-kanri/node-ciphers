import type { AESCipherEncodingOptions } from '@/types';
import BaseAESCipher from './base';

export class CTR extends BaseAESCipher {
	constructor(key: Buffer | string, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'ctr', encodingOptions);
	}
}

export default CTR;
