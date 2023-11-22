import type { BinaryLike } from 'crypto';
import type { TransformOptions } from 'stream';

import type { DESCipherEncodingOptions } from '@/types';
import BaseDESCipher from './base';

export class ECB extends BaseDESCipher {
	constructor(key: BinaryLike, encodingOptions?: DESCipherEncodingOptions) {
		super(key, 'ecb', encodingOptions);
	}

	// @ts-ignore
	decrypt(encryptedData: BinaryLike, iv?: null, encodingOptions?: DESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		try {
			return this.getDecipherResult(this.createDecipher(null, decipherOptions), encryptedData, encodingOptions);
		} catch (error) {}
	}

	encrypt(data: BinaryLike, encodingOptions?: DESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		try {
			return { data: this.getCipherResult(this.createCipher(null, cipherOptions), data, encodingOptions), iv: null };
		} catch (error) {}
	}
}

export default ECB;
