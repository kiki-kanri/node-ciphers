import { createCipheriv, createDecipheriv } from 'node:crypto';
import type { BinaryLike } from 'node:crypto';
import type { TransformOptions } from 'node:stream';

import { availableCiphers } from '../../../constants';
import type { DESCipherAlgorithm, DESCipherEncodingOptions, DESCipherMode } from '../../../types';
import BaseCipher from '../../base';

const keyLengthToModePrefixMap: Record<number, '' | '-ede3' | '-ede'> = Object.freeze({
    8: '',
    16: '-ede',
    24: '-ede3',
});

export abstract class BaseDESCipher extends BaseCipher {
    readonly #algorithm: DESCipherAlgorithm;
    readonly #key: NodeJS.ArrayBufferView;

    constructor(key: BinaryLike, mode: DESCipherMode, encodingOptions?: DESCipherEncodingOptions) {
        super(encodingOptions);
        this.#key = this.dataToBuffer(key, this.encodingOptions.key);
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
