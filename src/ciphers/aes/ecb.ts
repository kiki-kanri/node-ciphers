import type { TransformOptions } from 'stream';

import type { AESCipherEncodingOptions } from '@/types';
import BaseAESCipher from './base';

export class ECB extends BaseAESCipher {
	constructor(key: Buffer | string, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'ecb', encodingOptions);
	}

	decrypt(encryptedData: string, iv: null, encodingOptions?: AESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		try {
			const decipher = this.createDecipher(iv, decipherOptions);
			return this.getDecipherResult(decipher, encryptedData, encodingOptions);
		} catch (_) {}
	}

	encrypt(data: Buffer | string, encodingOptions?: AESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		try {
			return { data: this.getCipherResult(this.createCipher(null, cipherOptions), data, encodingOptions), iv: null };
		} catch (_) {}
	}
}

export default ECB;
