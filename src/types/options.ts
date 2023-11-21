export interface BaseCipherEncodingOptions {
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

export namespace BaseCipherEncodingOptions {
	export type Decrypt = Pick<BaseCipherEncodingOptions, 'decryptInput' | 'decryptOutput' | 'iv'>;
	export type Encrypt = Pick<BaseCipherEncodingOptions, 'encryptInput' | 'encryptOutput' | 'iv'>;
}
