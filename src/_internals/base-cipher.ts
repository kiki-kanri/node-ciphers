import { Buffer } from 'node:buffer';
import type {
    BinaryLike,
    Cipheriv,
    Decipheriv,
} from 'node:crypto';

import type { RequiredDeep } from 'type-fest';

import { defaultEncodingOptions } from '../_internals/constants';
import type {
    BaseCipherEncodingOptions,
    HasAuthTagAesCipherEncodingOptions,
    Result,
} from '../types';

export class BaseCipher<EncodingOptions extends HasAuthTagAesCipherEncodingOptions = BaseCipherEncodingOptions> {
    readonly #encodingOptions: Readonly<RequiredDeep<EncodingOptions>>;

    constructor(encodingOptions?: EncodingOptions) {
        this.#encodingOptions = <Readonly<RequiredDeep<EncodingOptions>>>{
            ...defaultEncodingOptions,
            ...encodingOptions,
        };
    }

    get encodingOptions() {
        return this.#encodingOptions;
    }

    protected createErrorResult(error: unknown) {
        return {
            error: error as unknown,
            ok: false as const,
        };
    }

    protected createOkResult<T>(value: T) {
        return {
            ok: true as const,
            value: value as T,
        };
    }

    protected dataToBuffer(data: BinaryLike, encoding: BufferEncoding) {
        return typeof data === 'string' ? Buffer.from(data, encoding) : data;
    }

    protected getCipherResult(cipher: Cipheriv, data: BinaryLike, encodingOptions?: EncodingOptions) {
        const outputEncoding = encodingOptions?.encryptOutput || this.#encodingOptions.encryptOutput;
        return cipher.update(
            this.dataToBuffer(data, encodingOptions?.encryptInput || this.#encodingOptions.encryptInput),
            undefined,
            outputEncoding,
        ) + cipher.final(outputEncoding);
    }

    protected getDecipherResult(decipher: Decipheriv, encryptedData: BinaryLike, encodingOptions?: EncodingOptions) {
        const outputEncoding = encodingOptions?.decryptOutput || this.#encodingOptions.decryptOutput;
        return decipher.update(
            this.dataToBuffer(encryptedData, encodingOptions?.decryptInput || this.#encodingOptions.decryptInput),
            undefined,
            outputEncoding,
        ) + decipher.final(outputEncoding);
    }

    protected parseJson<T>(data: string): Result<T> {
        try {
            return this.createOkResult(JSON.parse(data) as T);
        } catch (error) {
            return this.createErrorResult(error);
        }
    }
}
