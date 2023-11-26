import { randomBytes, type BinaryLike } from 'crypto';
import type { TransformOptions } from 'stream';

import type { HasAuthTagAESCipherEncodingOptions } from '@/types';
import BaseAESCipher from './base';

type AvailableIvLength = 7 | 8 | 9 | 10 | 11 | 12 | 13;

export class CCM extends BaseAESCipher<HasAuthTagAESCipherEncodingOptions> {
	#authTagLength: number;
	#ivLength: AvailableIvLength;

	constructor(key: BinaryLike, encodingOptions?: HasAuthTagAESCipherEncodingOptions, authTagLength: number = 16, ivLength: AvailableIvLength = 12) {
		super(key, 'ccm', encodingOptions);
		this.#authTagLength = authTagLength;
		this.#ivLength = ivLength;
	}

	decrypt(encryptedData: BinaryLike, iv: BinaryLike, authTag: BinaryLike, authTagLength: number = this.#authTagLength, encodingOptions?: HasAuthTagAESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		try {
			const decipher = this.createDecipher(typeof iv === 'string' ? Buffer.from(iv, encodingOptions?.iv || this.encodingOptions.iv) : iv, { authTagLength, ...decipherOptions });
			decipher.setAuthTag(typeof authTag === 'string' ? Buffer.from(authTag, encodingOptions?.authTag || this.encodingOptions.authTag) : authTag);
			return this.getDecipherResult(decipher, encryptedData, encodingOptions);
		} catch (error) {}
	}

	decryptToJSON<T = any>(encryptedData: BinaryLike, iv: BinaryLike, authTag: BinaryLike, authTagLength: number = this.#authTagLength, encodingOptions?: HasAuthTagAESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		const decryptedData = this.decrypt(encryptedData, iv, authTag, authTagLength, encodingOptions, decipherOptions);
		if (!decryptedData) return;
		try {
			return JSON.parse(decryptedData) as T;
		} catch (error) {}
	}

	encrypt(data: BinaryLike, authTagLength: number = this.#authTagLength, ivLength: AvailableIvLength = this.#ivLength, encodingOptions?: HasAuthTagAESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		const iv = randomBytes(ivLength);
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

	encryptJSON(data: any, authTagLength: number = this.#authTagLength, ivLength: AvailableIvLength = this.#ivLength, encodingOptions?: HasAuthTagAESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		return this.encrypt(JSON.stringify(data), authTagLength, ivLength, encodingOptions, cipherOptions);
	}
}

export default CCM;
