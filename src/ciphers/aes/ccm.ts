import crypto from 'crypto';
import type { TransformOptions } from 'stream';

import type { HasAuthTagAESCipherEncodingOptions } from '@/types';
import BaseAESCipher from './base';

type AvailableIvLength = 7 | 8 | 9 | 10 | 11 | 12 | 13;

export class CCM extends BaseAESCipher<HasAuthTagAESCipherEncodingOptions> {
	#authTagLength: number;
	#ivLength: AvailableIvLength;

	constructor(key: crypto.BinaryLike, encodingOptions?: HasAuthTagAESCipherEncodingOptions, authTagLength: number = 16, ivLength: AvailableIvLength = 12) {
		super(key, 'ccm', encodingOptions);
		this.#authTagLength = authTagLength;
		this.#ivLength = ivLength;
	}

	decrypt(encryptedData: crypto.BinaryLike, iv: crypto.BinaryLike, authTag: crypto.BinaryLike, authTagLength: number = this.#authTagLength, encodingOptions?: HasAuthTagAESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		try {
			const decipher = this.createDecipher(typeof iv === 'string' ? Buffer.from(iv, encodingOptions?.iv || this.encodingOptions.iv) : iv, { authTagLength, ...decipherOptions });
			decipher.setAuthTag(typeof authTag === 'string' ? Buffer.from(authTag, encodingOptions?.authTag || this.encodingOptions.authTag) : authTag);
			return this.getDecipherResult(decipher, encryptedData, encodingOptions);
		} catch (error) {}
	}

	encrypt(data: crypto.BinaryLike, authTagLength: number = this.#authTagLength, ivLength: AvailableIvLength = this.#ivLength, encodingOptions?: HasAuthTagAESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		const iv = crypto.randomBytes(ivLength);
		try {
			const cipher = this.createCipher(iv, { authTagLength, ...cipherOptions });
			const encryptedData = this.getCipherResult(cipher, data, encodingOptions);
			return {
				authTag: cipher.getAuthTag().toString(encodingOptions?.authTag || this.encodingOptions.authTag),
				authTagLength,
				data: encryptedData,
				iv: iv.toString(encodingOptions?.iv || this.encodingOptions.iv)
			};
		} catch (error) {}
	}
}

export default CCM;
