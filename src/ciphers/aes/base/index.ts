import crypto from 'crypto';
import type { TransformOptions } from 'stream';
import type { RequiredDeep } from 'type-fest';

import type { AESCipherEncodingOptions, AvailableAESCipherAlgorithm, AvailableAESCipherMode, HasAuthTagAESCipherEncodingOptions } from '@/types';

export const availableCiphers: Readonly<string[]> = crypto.getCiphers();

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
	#algorithm: AvailableAESCipherAlgorithm;
	#encodingOptions: Readonly<RequiredDeep<EncodingOptions>>;
	#key: NodeJS.ArrayBufferView;

	constructor(key: crypto.BinaryLike, mode: AvailableAESCipherMode, encodingOptions?: EncodingOptions) {
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

	protected createCipher(iv: crypto.BinaryLike, options: crypto.CipherCCMOptions): crypto.CipherCCM;
	protected createCipher(iv: crypto.BinaryLike, options: crypto.CipherGCMOptions): crypto.CipherGCM;
	protected createCipher(iv: crypto.BinaryLike | null, options?: TransformOptions): crypto.Cipher;
	protected createCipher(iv: crypto.BinaryLike | null, options?: crypto.CipherCCMOptions | crypto.CipherGCMOptions | TransformOptions) {
		return crypto.createCipheriv(this.#algorithm, this.#key, iv, options);
	}

	protected createDecipher(iv: crypto.BinaryLike, options: crypto.CipherCCMOptions): crypto.DecipherCCM;
	protected createDecipher(iv: crypto.BinaryLike, options: crypto.CipherGCMOptions): crypto.DecipherGCM;
	protected createDecipher(iv: crypto.BinaryLike | null, options?: TransformOptions): crypto.Decipher;
	protected createDecipher(iv: crypto.BinaryLike | null, options?: crypto.CipherCCMOptions | crypto.CipherGCMOptions | TransformOptions) {
		return crypto.createDecipheriv(this.#algorithm, this.#key, iv, options);
	}

	protected getCipherResult(cipher: crypto.Cipher, data: crypto.BinaryLike, encodingOptions?: EncodingOptions) {
		if (typeof data === 'string') data = Buffer.from(data, encodingOptions?.encryptInput || this.#encodingOptions.encryptInput);
		return `${cipher.update(data, undefined, encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput)}${cipher.final(encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput)}`;
	}

	protected getDecipherResult(decipher: crypto.Decipher, encryptedData: crypto.BinaryLike, encodingOptions?: EncodingOptions) {
		if (typeof encryptedData === 'string') encryptedData = Buffer.from(encryptedData, encodingOptions?.decryptInput || this.#encodingOptions.decryptInput);
		return `${decipher.update(encryptedData, undefined, encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput)}${decipher.final(encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput)}`;
	}
}

export default BaseAESCipher;
