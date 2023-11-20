import { createCipheriv, createDecipheriv, getCiphers } from 'crypto';
import type { BinaryLike, Cipher, CipherCCM, CipherCCMOptions, CipherGCM, CipherGCMOptions, Decipher, DecipherCCM, DecipherGCM } from 'crypto';
import type { TransformOptions } from 'stream';
import type { RequiredDeep } from 'type-fest';

import type { AESCipherAlgorithm, AESCipherEncodingOptions, AESCipherMode, HasAuthTagAESCipherEncodingOptions } from '@/types';

export const availableCiphers: Readonly<string[]> = getCiphers();

export const defaultEncodingOptions = {
	authTag: 'hex',
	decryptInput: 'hex',
	decryptOutput: 'utf8',
	encryptInput: 'utf8',
	encryptOutput: 'hex',
	key: 'utf8',
	iv: 'hex'
} as const;

export const keyLengthToBitsMap: Readonly<Record<number, 128 | 192 | 256>> = {
	16: 128,
	24: 192,
	32: 256
};

export abstract class BaseAESCipher<EncodingOptions extends HasAuthTagAESCipherEncodingOptions = AESCipherEncodingOptions> {
	#algorithm: AESCipherAlgorithm;
	#encodingOptions: Readonly<RequiredDeep<EncodingOptions>>;
	#key: NodeJS.ArrayBufferView;

	constructor(key: BinaryLike, mode: AESCipherMode, encodingOptions?: EncodingOptions) {
		this.#encodingOptions = <Readonly<RequiredDeep<EncodingOptions>>>{ ...defaultEncodingOptions, ...encodingOptions };
		this.#key = typeof key === 'string' ? Buffer.from(key, this.#encodingOptions.key) : key;
		const modeBits = keyLengthToBitsMap[this.#key.byteLength];
		if (!modeBits) throw new Error('Invalid key length');
		this.#algorithm = `aes-${modeBits}-${mode}`;
		if (!availableCiphers.includes(this.#algorithm)) throw new Error('Invalid algorithm');
	}

	get algorithm() {
		return this.#algorithm;
	}

	get encodingOptions() {
		return this.#encodingOptions;
	}

	protected createCipher(iv: BinaryLike, options: CipherCCMOptions): CipherCCM;
	protected createCipher(iv: BinaryLike, options: CipherGCMOptions): CipherGCM;
	protected createCipher(iv: BinaryLike | null, options?: TransformOptions): Cipher;
	protected createCipher(iv: BinaryLike | null, options?: CipherCCMOptions | CipherGCMOptions | TransformOptions) {
		return createCipheriv(this.#algorithm, this.#key, iv, options);
	}

	protected createDecipher(iv: BinaryLike, options: CipherCCMOptions): DecipherCCM;
	protected createDecipher(iv: BinaryLike, options: CipherGCMOptions): DecipherGCM;
	protected createDecipher(iv: BinaryLike | null, options?: TransformOptions): Decipher;
	protected createDecipher(iv: BinaryLike | null, options?: CipherCCMOptions | CipherGCMOptions | TransformOptions) {
		return createDecipheriv(this.#algorithm, this.#key, iv, options);
	}

	protected getCipherResult(cipher: Cipher, data: BinaryLike, encodingOptions?: EncodingOptions) {
		if (typeof data === 'string') data = Buffer.from(data, encodingOptions?.encryptInput || this.#encodingOptions.encryptInput);
		return `${cipher.update(data, undefined, encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput)}${cipher.final(encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput)}`;
	}

	protected getDecipherResult(decipher: Decipher, encryptedData: BinaryLike, encodingOptions?: EncodingOptions) {
		if (typeof encryptedData === 'string') encryptedData = Buffer.from(encryptedData, encodingOptions?.decryptInput || this.#encodingOptions.decryptInput);
		return `${decipher.update(encryptedData, undefined, encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput)}${decipher.final(encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput)}`;
	}
}

export default BaseAESCipher;
