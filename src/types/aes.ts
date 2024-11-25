import type { Except } from 'type-fest';

import type { BaseCipherEncodingOptions } from './options';

export type { BaseCipherEncodingOptions as AESCipherEncodingOptions } from './options';

export type AESCipherAlgorithm = `aes-${128 | 192 | 256}-${AESCipherMode}`;
export type AESCipherMode = 'cbc' | 'ccm' | 'cfb' | 'cfb1' | 'cfb8' | 'ctr' | 'ecb' | 'gcm' | 'ofb';

export interface HasAuthTagAESCipherEncodingOptions extends BaseCipherEncodingOptions {
    /**
     * @default 'hex'
     */
    authTag?: BufferEncoding;
}

// eslint-disable-next-line ts/no-namespace
export namespace HasAuthTagAESCipherEncodingOptions {
    export type Decrypt = Except<HasAuthTagAESCipherEncodingOptions, 'encryptInput' | 'encryptOutput' | 'key'>;
    export type Encrypt = Except<HasAuthTagAESCipherEncodingOptions, 'decryptInput' | 'decryptOutput' | 'key'>;
}
