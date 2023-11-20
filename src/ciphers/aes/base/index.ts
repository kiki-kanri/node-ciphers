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
	#key: Buffer;

	constructor(key: Buffer | string, mode: AvailableAESCipherMode, encodingOptions?: EncodingOptions) {
		this.#encodingOptions = <Readonly<RequiredDeep<EncodingOptions>>>{ ...defaultEncodingOptions, ...encodingOptions };
		this.#key = key instanceof Buffer ? key : Buffer.from(key, this.#encodingOptions.key);
		const modeBits = keyLengthToBitsMap[this.#key.length];
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

	protected createCipher(iv: Buffer, options: crypto.CipherCCMOptions): crypto.CipherCCM;
	protected createCipher(iv: Buffer, options: crypto.CipherGCMOptions): crypto.CipherGCM;
	protected createCipher(iv: Buffer | null, options?: TransformOptions): crypto.Cipher;
	protected createCipher(iv: Buffer | null, options?: crypto.CipherCCMOptions | crypto.CipherGCMOptions | TransformOptions) {
		return crypto.createCipheriv(this.#algorithm, this.#key, iv, options);
	}

	protected createDecipher(iv: Buffer, options: crypto.CipherCCMOptions): crypto.DecipherCCM;
	protected createDecipher(iv: Buffer, options: crypto.CipherGCMOptions): crypto.DecipherGCM;
	protected createDecipher(iv: Buffer | null, options?: TransformOptions): crypto.Decipher;
	protected createDecipher(iv: Buffer | null, options?: crypto.CipherCCMOptions | crypto.CipherGCMOptions | TransformOptions) {
		return crypto.createDecipheriv(this.#algorithm, this.#key, iv, options);
	}

	protected getCipherResult(cipher: crypto.Cipher, data: Buffer | string, encodingOptions?: EncodingOptions) {
		data = data instanceof Buffer ? data : Buffer.from(data, encodingOptions?.encryptInput || this.#encodingOptions.encryptInput);
		return `${cipher.update(data, undefined, encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput)}${cipher.final(encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput)}`;
	}

	protected getDecipherResult(decipher: crypto.Decipher, encryptedData: Buffer | string, encodingOptions?: EncodingOptions) {
		encryptedData = encryptedData instanceof Buffer ? encryptedData : Buffer.from(encryptedData, encodingOptions?.decryptInput || this.#encodingOptions.decryptInput);
		return `${decipher.update(encryptedData, undefined, encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput)}${decipher.final(encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput)}`;
	}
}

export default BaseAESCipher;
