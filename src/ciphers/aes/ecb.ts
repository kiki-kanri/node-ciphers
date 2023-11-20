import type { BinaryLike } from 'crypto';
import type { TransformOptions } from 'stream';

import type { AESCipherEncodingOptions } from '@/types';
import BaseAESCipher from './base';

export class ECB extends BaseAESCipher {
	constructor(key: BinaryLike, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'ecb', encodingOptions);
	}

	decrypt(encryptedData: BinaryLike, iv: null, encodingOptions?: AESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		try {
			return this.getDecipherResult(this.createDecipher(iv, decipherOptions), encryptedData, encodingOptions);
		} catch (error) {}
	}

	encrypt(data: BinaryLike, encodingOptions?: AESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		try {
			return { data: this.getCipherResult(this.createCipher(null, cipherOptions), data, encodingOptions), iv: null };
		} catch (error) {}
	}
}

export default ECB;
