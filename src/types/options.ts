export interface BaseCipherEncodingOptions {
    /**
     * @default 'hex'
     */
    decryptInput?: BufferEncoding;

    /**
     * @default 'utf-8'
     */
    decryptOutput?: BufferEncoding;

    /**
     * @default 'utf-8'
     */
    encryptInput?: BufferEncoding;

    /**
     * @default 'hex'
     */
    encryptOutput?: BufferEncoding;

    /**
     * @default 'utf-8'
     */
    key?: BufferEncoding;

    /**
     * @default 'hex'
     */
    iv?: BufferEncoding;
}

// eslint-disable-next-line ts/no-namespace
export namespace BaseCipherEncodingOptions {
    export type Decrypt = Pick<BaseCipherEncodingOptions, 'decryptInput' | 'decryptOutput' | 'iv'>;
    export type Encrypt = Pick<BaseCipherEncodingOptions, 'encryptInput' | 'encryptOutput' | 'iv'>;
}
