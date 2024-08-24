import type { BinaryLike, Cipher, Decipher } from 'crypto';
import type { RequiredDeep } from 'type-fest';

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

	protected dataToBuffer(data: BinaryLike, encoding: BufferEncoding) {
		return typeof data === 'string' ? Buffer.from(data, encoding) : data;
	}

	protected getCipherResult(cipher: Cipher, data: BinaryLike, encodingOptions?: EncodingOptions) {
		const outputEncoding = encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput;
		return `${cipher.update(this.dataToBuffer(data, encodingOptions?.encryptInput || this.#encodingOptions.encryptInput), undefined, outputEncoding)}${cipher.final(outputEncoding)}`;
	}

	protected getDecipherResult(decipher: Decipher, encryptedData: BinaryLike, encodingOptions?: EncodingOptions) {
		const outputEncoding = encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput;
		return `${decipher.update(this.dataToBuffer(encryptedData, encodingOptions?.decryptInput || this.#encodingOptions.decryptInput), undefined, outputEncoding)}${decipher.final(outputEncoding)}`;
	}

	protected parseJSON<T>(data?: string) {
		if (data === undefined) return;
		try {
			return JSON.parse(data) as T;
		} catch (error) {}
	}
}

export default BaseCipher;
