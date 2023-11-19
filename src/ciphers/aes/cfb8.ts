import type { AESCipherEncodingOptions } from '@/types';
import BaseAESCipher from './base';

export class CFB8 extends BaseAESCipher {
	constructor(key: Buffer | string, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'cfb8', encodingOptions);
	}
}

export default CFB8;
