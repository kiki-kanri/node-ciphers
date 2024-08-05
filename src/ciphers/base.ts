import type { RequiredDeep } from 'type-fest';
import type { BinaryLike, Cipher, Decipher } from 'crypto';

import { defaultEncodingOptions } from '../constants';
import type { BaseCipherEncodingOptions, HasAuthTagAESCipherEncodingOptions } from '../types';

export class BaseCipher<EncodingOptions extends HasAuthTagAESCipherEncodingOptions = BaseCipherEncodingOptions> {
	#encodingOptions: Readonly<RequiredDeep<EncodingOptions>>;

	constructor(encodingOptions?: EncodingOptions) {
		this.#encodingOptions = <Readonly<RequiredDeep<EncodingOptions>>>{ ...defaultEncodingOptions, ...encodingOptions };
	}

	get encodingOptions() {
		return this.#encodingOptions;
	}

	protected getCipherResult(cipher: Cipher, data: BinaryLike, encodingOptions?: EncodingOptions) {
		// prettier-ignore
		return `${cipher.update(typeof data === 'string' ? Buffer.from(data, encodingOptions?.encryptInput || this.#encodingOptions.encryptInput) : data, undefined, encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput)}${cipher.final(encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput)}`;
	}

	protected getDecipherResult(decipher: Decipher, encryptedData: BinaryLike, encodingOptions?: EncodingOptions) {
		// prettier-ignore
		return `${decipher.update(typeof encryptedData === 'string' ? Buffer.from(encryptedData, encodingOptions?.decryptInput || this.#encodingOptions.decryptInput) : encryptedData, undefined, encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput)}${decipher.final(encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput)}`;
	}

	protected parseJSON<T>(data?: string) {
		if (data === undefined) return;
		try {
			return JSON.parse(data) as T;
		} catch (error) {}
	}
}

export default BaseCipher;
