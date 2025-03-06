import type { Except } from 'type-fest';

import type { BaseCipherEncodingOptions } from './options';

export type { BaseCipherEncodingOptions as AesCipherEncodingOptions } from './options';

export type AesCipherAlgorithm = `aes-${128 | 192 | 256}-${AesCipherMode}`;
export type AesCipherMode = 'cbc' | 'ccm' | 'cfb1' | 'cfb8' | 'cfb' | 'ctr' | 'ecb' | 'gcm' | 'ofb';

export interface HasAuthTagAesCipherEncodingOptions extends BaseCipherEncodingOptions {
    /**
     * @default 'hex'
     */
    authTag?: BufferEncoding;
}

// eslint-disable-next-line ts/no-namespace
export namespace HasAuthTagAesCipherEncodingOptions {
    export type Decrypt = Except<HasAuthTagAesCipherEncodingOptions, 'encryptInput' | 'encryptOutput' | 'key'>;
    export type Encrypt = Except<HasAuthTagAesCipherEncodingOptions, 'decryptInput' | 'decryptOutput' | 'key'>;
}
