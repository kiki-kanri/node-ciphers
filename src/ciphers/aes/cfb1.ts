import type { AESCipherEncodingOptions } from '@/types';
import BaseAESCipher from './base';

export class CFB1 extends BaseAESCipher {
	constructor(key: Buffer | string, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'cfb1', encodingOptions);
	}
}

export default CFB1;
