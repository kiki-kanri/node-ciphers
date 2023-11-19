export type AvailableAESMode = 'cbc' | 'cfb' | 'cfb1' | 'cfb8' | 'ctr';

export interface AESCipherEncodingOptions {
	/**
	 * @default 'hex'
	 */
	decryptInput?: BufferEncoding;

	/**
	 * @default 'utf8'
	 */
	decryptOutput?: BufferEncoding;

	/**
	 * @default 'utf8'
	 */
	encryptInput?: BufferEncoding;

	/**
	 * @default 'hex'
	 */
	encryptOutput?: BufferEncoding;

	/**
	 * @default 'utf8'
	 */
	key?: BufferEncoding;

	/**
	 * @default 'hex'
	 */
	iv?: BufferEncoding;
}

export namespace AESCipherEncodingOptions {
	export type Decrypt = Pick<AESCipherEncodingOptions, 'decryptInput' | 'decryptOutput' | 'iv'>;
	export type Encrypt = Pick<AESCipherEncodingOptions, 'encryptInput' | 'encryptOutput' | 'iv'>;
}
