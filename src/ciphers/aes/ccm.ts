import crypto, { type CipherCCMOptions } from 'crypto';
import type { TransformOptions } from 'stream';

import type { HasAuthTagAESCipherEncodingOptions } from '@/types';
import { availableCiphers, defaultEncodingOptions, keyLengthToBitsMap } from './base';

type AvailableIvLength = 7 | 8 | 9 | 10 | 11 | 12 | 13;

export class CCM {
	#algorithm: `aes-${128 | 192 | 256}-ccm`;
	#authTagLength: number;
	#encodingOptions: Required<HasAuthTagAESCipherEncodingOptions>;
	#ivLength: AvailableIvLength;
	#key: Buffer;

	constructor(key: Buffer | string, encodingOptions?: HasAuthTagAESCipherEncodingOptions, authTagLength: number = 16, ivLength: AvailableIvLength = 12) {
		this.#encodingOptions = { ...defaultEncodingOptions, ...encodingOptions };
		this.#key = key instanceof Buffer ? key : Buffer.from(key, this.#encodingOptions.key);
		const modeBits = keyLengthToBitsMap[this.#key.length];
		if (!modeBits) throw new Error('Invalid key length');
		this.#algorithm = `aes-${modeBits}-ccm` as const;
		if (!availableCiphers.includes(this.#algorithm)) throw new Error('Invalid algorithm');
		this.#authTagLength = authTagLength;
		this.#ivLength = ivLength;
	}

	get algorithm() {
		return this.#algorithm;
	}

	decrypt(encryptedData: string, iv: Buffer | string, authTag: Buffer | string, authTagLength: number = this.#authTagLength, encodingOptions?: HasAuthTagAESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		try {
			const decipher = crypto.createDecipheriv(this.#algorithm, this.#key, iv instanceof Buffer ? iv : Buffer.from(iv, encodingOptions?.iv || this.#encodingOptions.iv), { authTagLength, ...decipherOptions } as CipherCCMOptions);
			decipher.setAuthTag(authTag instanceof Buffer ? authTag : Buffer.from(authTag, encodingOptions?.authTag || this.#encodingOptions.authTag));
			// prettier-ignore
			return `${decipher.update(encryptedData, encodingOptions?.decryptInput || this.#encodingOptions.decryptInput, encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput)}${decipher.final(encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput)}`;
		} catch (error) {}
	}

	encrypt(data: Buffer | string, authTagLength: number = this.#authTagLength, ivLength: AvailableIvLength = this.#ivLength, encodingOptions?: HasAuthTagAESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		const iv = crypto.randomBytes(ivLength);
		try {
			const cipher = crypto.createCipheriv(this.#algorithm, this.#key, iv, { authTagLength, ...cipherOptions } as CipherCCMOptions);
			// prettier-ignore
			const encryptedData = `${cipher.update(data instanceof Buffer ? data : Buffer.from(data, encodingOptions?.encryptInput || this.#encodingOptions.encryptInput), undefined, encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput)}${cipher.final(encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput)}`;
			return {
				authTag: cipher.getAuthTag().toString(encodingOptions?.authTag || this.#encodingOptions.authTag),
				authTagLength,
				data: encryptedData,
				iv: iv.toString(encodingOptions?.iv || this.#encodingOptions.iv)
			};
		} catch (error) {}
	}
}

export default CCM;
