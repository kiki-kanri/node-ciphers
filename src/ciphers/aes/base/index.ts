import { createCipheriv, createDecipheriv } from 'crypto';
import type { BinaryLike, Cipher, CipherCCM, CipherCCMOptions, CipherGCM, CipherGCMOptions, Decipher, DecipherCCM, DecipherGCM } from 'crypto';
import type { TransformOptions } from 'stream';

import { availableCiphers } from '../../../constants';
import type { AESCipherAlgorithm, AESCipherEncodingOptions, AESCipherMode, HasAuthTagAESCipherEncodingOptions } from '../../../types';
import BaseCipher from '../../base';

export const keyLengthToBitsMap = Object.freeze<Record<number, 128 | 192 | 256>>({
	16: 128,
	24: 192,
	32: 256
});

export abstract class BaseAESCipher<EncodingOptions extends HasAuthTagAESCipherEncodingOptions = AESCipherEncodingOptions> extends BaseCipher<EncodingOptions> {
	readonly #algorithm: AESCipherAlgorithm;
	readonly #key: NodeJS.ArrayBufferView;

	constructor(key: BinaryLike, mode: AESCipherMode, encodingOptions?: EncodingOptions) {
		super(encodingOptions);
		this.#key = this.dataToBuffer(key, this.encodingOptions.key);
		const modeBits = keyLengthToBitsMap[this.#key.byteLength];
		if (!modeBits) throw new Error('Invalid key length');
		this.#algorithm = `aes-${modeBits}-${mode}`;
		if (!availableCiphers.includes(this.#algorithm)) throw new Error('Invalid algorithm');
	}

	get algorithm() {
		return this.#algorithm;
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
}

export default BaseAESCipher;
