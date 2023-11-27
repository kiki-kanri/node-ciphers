import { createCipheriv, createDecipheriv } from 'crypto';
import type { BinaryLike } from 'crypto';
import type { TransformOptions } from 'stream';

import { availableCiphers } from '@/constants';
import BaseCipher from '../../base';
import type { DESCipherAlgorithm, DESCipherEncodingOptions, DESCipherMode } from '@/types';

const keyLengthToModePrefixMap: Record<number, '' | '-ede' | '-ede3'> = {
	8: '',
	16: '-ede',
	24: '-ede3'
};

export abstract class BaseDESCipher extends BaseCipher {
	#algorithm: DESCipherAlgorithm;
	#key: NodeJS.ArrayBufferView;

	constructor(key: BinaryLike, mode: DESCipherMode, encodingOptions?: DESCipherEncodingOptions) {
		super(encodingOptions);
		this.#key = typeof key === 'string' ? Buffer.from(key, this.encodingOptions.key) : key;
		const desModePrefix = keyLengthToModePrefixMap[this.#key.byteLength];
		if (desModePrefix === undefined) throw new Error('Invalid key length');
		this.#algorithm = `des${desModePrefix}-${mode}`;
		if (!availableCiphers.includes(this.#algorithm)) throw new Error('Invalid algorithm');
	}

	get algorithm() {
		return this.#algorithm;
	}

	protected createCipher(iv: BinaryLike | null, options?: TransformOptions) {
		return createCipheriv(this.#algorithm, this.#key, iv, options);
	}

	protected createDecipher(iv: BinaryLike | null, options?: TransformOptions) {
		return createDecipheriv(this.#algorithm, this.#key, iv, options);
	}
}

export default BaseDESCipher;
