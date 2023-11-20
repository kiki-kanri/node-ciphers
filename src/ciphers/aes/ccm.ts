import crypto from 'crypto';
import type { TransformOptions } from 'stream';

import type { HasAuthTagAESCipherEncodingOptions } from '@/types';
import BaseAESCipher from './base';

type AvailableIvLength = 7 | 8 | 9 | 10 | 11 | 12 | 13;

export class CCM extends BaseAESCipher<HasAuthTagAESCipherEncodingOptions> {
	#authTagLength: number;
	#ivLength: AvailableIvLength;

	constructor(key: Buffer | string, encodingOptions?: HasAuthTagAESCipherEncodingOptions, authTagLength: number = 16, ivLength: AvailableIvLength = 12) {
		super(key, 'ccm', encodingOptions);
		this.#authTagLength = authTagLength;
		this.#ivLength = ivLength;
	}

	decrypt(encryptedData: string, iv: Buffer | string, authTag: Buffer | string, authTagLength: number = this.#authTagLength, encodingOptions?: HasAuthTagAESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		try {
			const decipher = this.createDecipher(iv instanceof Buffer ? iv : Buffer.from(iv, encodingOptions?.iv || this.encodingOptions.iv), { authTagLength, ...decipherOptions });
			decipher.setAuthTag(authTag instanceof Buffer ? authTag : Buffer.from(authTag, encodingOptions?.authTag || this.encodingOptions.authTag));
			return this.getDecipherResult(decipher, encryptedData, encodingOptions);
		} catch (error) {}
	}

	encrypt(data: Buffer | string, authTagLength: number = this.#authTagLength, ivLength: AvailableIvLength = this.#ivLength, encodingOptions?: HasAuthTagAESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
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
