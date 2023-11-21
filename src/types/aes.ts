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

export namespace HasAuthTagAESCipherEncodingOptions {
	export type Decrypt = Omit<HasAuthTagAESCipherEncodingOptions, 'encryptInput' | 'encryptOutput' | 'key'>;
	export type Encrypt = Omit<HasAuthTagAESCipherEncodingOptions, 'decryptInput' | 'decryptOutput' | 'key'>;
}
