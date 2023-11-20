export type AESCipherAlgorithm = `aes-${128 | 192 | 256}-${AESCipherMode}`;
export type AESCipherMode = 'cbc' | 'ccm' | 'cfb' | 'cfb1' | 'cfb8' | 'ctr' | 'ecb' | 'gcm' | 'ofb';

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

export interface HasAuthTagAESCipherEncodingOptions extends AESCipherEncodingOptions {
	/**
	 * @default 'hex'
	 */
	authTag?: BufferEncoding;
}

export namespace AESCipherEncodingOptions {
	export type Decrypt = Pick<AESCipherEncodingOptions, 'decryptInput' | 'decryptOutput' | 'iv'>;
	export type Encrypt = Pick<AESCipherEncodingOptions, 'encryptInput' | 'encryptOutput' | 'iv'>;
}

export namespace HasAuthTagAESCipherEncodingOptions {
	export type Decrypt = Omit<HasAuthTagAESCipherEncodingOptions, 'encryptInput' | 'encryptOutput'>;
	export type Encrypt = Omit<HasAuthTagAESCipherEncodingOptions, 'decryptInput' | 'decryptOutput'>;
}
