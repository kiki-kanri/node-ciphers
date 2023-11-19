import crypto from 'crypto';
import type { TransformOptions } from 'stream';

import type { AESCipherEncodingOptions } from '@/types';
import { availableCiphers, defaultEncodingOptions, keyLengthToBitsMap } from './base';

export class ECB {
	#algorithm: `aes-${128 | 192 | 256}-ecb`;
	#encodingOptions: Required<AESCipherEncodingOptions>;
	#key: Buffer;

	constructor(key: Buffer | string, encodingOptions?: AESCipherEncodingOptions) {
		this.#encodingOptions = { ...defaultEncodingOptions, ...encodingOptions };
		this.#key = key instanceof Buffer ? key : Buffer.from(key, this.#encodingOptions.key);
		const modeBits = keyLengthToBitsMap[this.#key.length];
		if (!modeBits) throw new Error('Invalid key length');
		this.#algorithm = `aes-${modeBits}-ecb` as const;
		if (!availableCiphers.includes(this.#algorithm)) throw new Error('Invalid algorithm');
	}

	get algorithm() {
		return this.#algorithm;
	}

	// @ts-ignore
	decrypt(encryptedData: string, iv: null, encodingOptions?: AESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		try {
			const decipher = crypto.createDecipheriv(this.#algorithm, this.#key, null, decipherOptions);
			// prettier-ignore
			return `${decipher.update(encryptedData, encodingOptions?.decryptInput || this.#encodingOptions.decryptInput, encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput)}${decipher.final(encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput)}`;
		} catch (_) {}
	}

	encrypt(data: Buffer | string, encodingOptions?: AESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		try {
			const cipher = crypto.createCipheriv(this.#algorithm, this.#key, null, cipherOptions);
			// prettier-ignore
			const encryptedData = `${cipher.update(data instanceof Buffer ? data : Buffer.from(data, encodingOptions?.encryptInput || this.#encodingOptions.encryptInput), undefined, encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput)}${cipher.final(encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput)}`;
			return { data: encryptedData, iv: null };
		} catch (_) {}
	}
}

export default ECB;
