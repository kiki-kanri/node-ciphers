import type { BinaryLike } from 'crypto';
import type { TransformOptions } from 'stream';

import type { AESCipherEncodingOptions } from '@/types';
import BaseAESCipher from './base';

export class ECB extends BaseAESCipher {
	constructor(key: BinaryLike, encodingOptions?: AESCipherEncodingOptions) {
		super(key, 'ecb', encodingOptions);
	}

	// @ts-ignore
	decrypt(encryptedData: BinaryLike, iv?: null, encodingOptions?: AESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		try {
			return this.getDecipherResult(this.createDecipher(null, decipherOptions), encryptedData, encodingOptions);
		} catch (error) {}
	}

	decryptToJSON<T = any>(encryptedData: BinaryLike, iv?: null, encodingOptions?: AESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		const decryptedData = this.decrypt(encryptedData, iv, encodingOptions, decipherOptions);
		if (!decryptedData) return;
		try {
			return JSON.parse(decryptedData) as T;
		} catch (error) {}
	}

	encrypt(data: BinaryLike, encodingOptions?: AESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		try {
			return { data: this.getCipherResult(this.createCipher(null, cipherOptions), data, encodingOptions), iv: null };
		} catch (error) {}
	}

	encryptJSON(data: any, encodingOptions?: AESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		return this.encrypt(JSON.stringify(data), encodingOptions, cipherOptions);
	}
}

export default ECB;
