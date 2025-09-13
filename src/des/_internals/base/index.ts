import {
    createCipheriv,
    createDecipheriv,
} from 'node:crypto';
import type { BinaryLike } from 'node:crypto';
import type { TransformOptions } from 'node:stream';

import { BaseCipher } from '@/_internals/base-cipher';
import { availableCiphers } from '@/_internals/constants';
import type {
    DesCipherAlgorithm,
    DesCipherEncodingOptions,
    DesCipherMode,
} from '@/types';

const keyLengthToModePrefixMap: Readonly<Record<number, '' | '-ede3' | '-ede'>> = {
    8: '',
    16: '-ede',
    24: '-ede3',
};

export abstract class BaseDesCipher extends BaseCipher {
    readonly #algorithm: DesCipherAlgorithm;
    readonly #key: NodeJS.ArrayBufferView;

    constructor(key: BinaryLike, mode: DesCipherMode, encodingOptions?: DesCipherEncodingOptions) {
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
