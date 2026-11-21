export interface BaseCipherEncodingOptions {
    /**
     * @defaultValue 'hex'
     */
    decryptInput?: BufferEncoding;

    /**
     * @defaultValue 'utf-8'
     */
    decryptOutput?: BufferEncoding;

    /**
     * @defaultValue 'utf-8'
     */
    encryptInput?: BufferEncoding;

    /**
     * @defaultValue 'hex'
     */
    encryptOutput?: BufferEncoding;

    /**
     * @defaultValue 'hex'
     */
    iv?: BufferEncoding;

    /**
     * @defaultValue 'utf-8'
     */
    key?: BufferEncoding;
}

// eslint-disable-next-line ts/no-namespace
export namespace BaseCipherEncodingOptions {
    export type Decrypt = Pick<BaseCipherEncodingOptions, 'decryptInput' | 'decryptOutput' | 'iv'>;
    export type Encrypt = Pick<BaseCipherEncodingOptions, 'encryptInput' | 'encryptOutput' | 'iv'>;
}
