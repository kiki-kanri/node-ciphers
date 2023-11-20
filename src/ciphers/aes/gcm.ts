import crypto from 'crypto';
import type { TransformOptions } from 'stream';

import type { HasAuthTagAESCipherEncodingOptions } from '@/types';
import BaseAESCipher from './base';

export class GCM extends BaseAESCipher<HasAuthTagAESCipherEncodingOptions> {
	#ivLength: number;

	constructor(key: Buffer | string, encodingOptions?: HasAuthTagAESCipherEncodingOptions, ivLength: number = 12) {
		super(key, 'gcm', encodingOptions);
		this.#ivLength = ivLength;
	}

	decrypt(encryptedData: string, iv: Buffer | string, authTag: Buffer | string, authTagLength?: number, encodingOptions?: HasAuthTagAESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		try {
			const decipher = this.createDecipher(iv instanceof Buffer ? iv : Buffer.from(iv, encodingOptions?.iv || this.encodingOptions.iv), { authTagLength, ...decipherOptions });
			decipher.setAuthTag(authTag instanceof Buffer ? authTag : Buffer.from(authTag, encodingOptions?.authTag || this.encodingOptions.authTag));
			return this.getDecipherResult(decipher, encryptedData, encodingOptions);
		} catch (error) {}
	}

	encrypt(data: Buffer | string, authTagLength?: number, ivLength: number = this.#ivLength, encodingOptions?: HasAuthTagAESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
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

export default GCM;
