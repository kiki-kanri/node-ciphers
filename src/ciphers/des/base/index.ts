import { createCipheriv, createDecipheriv } from 'crypto';
import type { BinaryLike, Cipher, Decipher } from 'crypto';
import type { TransformOptions } from 'stream';
import type { RequiredDeep } from 'type-fest';

import { availableCiphers, defaultEncodingOptions } from '@/constants';
import type { DESCipherAlgorithm, DESCipherEncodingOptions, DESCipherMode } from '@/types';

export abstract class BaseDESCipher {
	#algorithm: DESCipherAlgorithm;
	#encodingOptions: Readonly<RequiredDeep<DESCipherEncodingOptions>>;
	#key: NodeJS.ArrayBufferView;

	constructor(key: BinaryLike, mode: DESCipherMode, encodingOptions?: DESCipherEncodingOptions) {
		this.#encodingOptions = <Readonly<RequiredDeep<DESCipherEncodingOptions>>>{ ...defaultEncodingOptions, ...encodingOptions };
		this.#key = typeof key === 'string' ? Buffer.from(key, this.#encodingOptions.key) : key;
		if (this.#key.byteLength !== 8) throw new Error('Invalid key length');
		this.#algorithm = `des-${mode}`;
		if (!availableCiphers.includes(this.#algorithm)) throw new Error('Invalid algorithm');
	}

	get algorithm() {
		return this.#algorithm;
	}

	get encodingOptions() {
		return this.#encodingOptions;
	}

	protected createCipher(iv: BinaryLike | null, options?: TransformOptions) {
		return createCipheriv(this.#algorithm, this.#key, iv, options);
	}

	protected createDecipher(iv: BinaryLike | null, options?: TransformOptions) {
		return createDecipheriv(this.#algorithm, this.#key, iv, options);
	}

	protected getCipherResult(cipher: Cipher, data: BinaryLike, encodingOptions?: DESCipherEncodingOptions) {
		// prettier-ignore
		return `${cipher.update(typeof data === 'string' ? Buffer.from(data, encodingOptions?.encryptInput || this.#encodingOptions.encryptInput) : data, undefined, encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput)}${cipher.final(encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput)}`;
	}

	protected getDecipherResult(decipher: Decipher, encryptedData: BinaryLike, encodingOptions?: DESCipherEncodingOptions) {
		// prettier-ignore
		return `${decipher.update(typeof encryptedData === 'string' ? Buffer.from(encryptedData, encodingOptions?.decryptInput || this.#encodingOptions.decryptInput) : encryptedData, undefined, encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput)}${decipher.final(encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput)}`;
	}
}

export default BaseDESCipher;
