import {
    createCipheriv,
    createDecipheriv,
} from 'node:crypto';
import type {
    BinaryLike,
    CipherCCM,
    CipherCCMOptions,
    CipherGCM,
    CipherGCMOptions,
    Cipheriv,
    DecipherCCM,
    DecipherGCM,
    Decipheriv,
} from 'node:crypto';
import type { TransformOptions } from 'node:stream';

import { BaseCipher } from '../../base';
import { availableCiphers } from '../../constants';
import type {
    AesCipherAlgorithm,
    AesCipherEncodingOptions,
    AesCipherMode,
    HasAuthTagAesCipherEncodingOptions,
} from '../../types';

const keyLengthToBitsMap: Readonly<Record<number, 128 | 192 | 256>> = {
    16: 128,
    24: 192,
    32: 256,
};

export abstract class BaseAesCipher<
    EncodingOptions extends HasAuthTagAesCipherEncodingOptions = AesCipherEncodingOptions,
> extends BaseCipher<EncodingOptions> {
    readonly #algorithm: AesCipherAlgorithm;
    readonly #key: NodeJS.ArrayBufferView;

    constructor(key: BinaryLike, mode: AesCipherMode, encodingOptions?: EncodingOptions) {
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
    protected createCipher(iv: BinaryLike | null, options?: TransformOptions): Cipheriv;
    protected createCipher(iv: BinaryLike | null, options?: CipherCCMOptions | CipherGCMOptions | TransformOptions) {
        return createCipheriv(this.#algorithm, this.#key, iv, options);
    }

    protected createDecipher(iv: BinaryLike, options: CipherCCMOptions): DecipherCCM;
    protected createDecipher(iv: BinaryLike, options: CipherGCMOptions): DecipherGCM;
    protected createDecipher(iv: BinaryLike | null, options?: TransformOptions): Decipheriv;
    protected createDecipher(iv: BinaryLike | null, options?: CipherCCMOptions | CipherGCMOptions | TransformOptions) {
        return createDecipheriv(this.#algorithm, this.#key, iv, options);
    }
}
