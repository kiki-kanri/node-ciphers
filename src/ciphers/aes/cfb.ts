import type { AESCipherEncodingOptions } from '@/types';
import BaseAESCipher from './base';

export class CFB extends BaseAESCipher {
	constructor(key: Buffer | string, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'cfb', encodingOptions);
	}
}

export default CFB;
