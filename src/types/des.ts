export type { BaseCipherEncodingOptions as DESCipherEncodingOptions } from './options';

export type DESCipherAlgorithm = `des${'' | '-ede' | '-ede3'}-${DESCipherMode}`;
export type DESCipherMode = 'cbc' | 'cfb' | 'cfb1' | 'cfb8' | 'ecb' | 'ofb';
