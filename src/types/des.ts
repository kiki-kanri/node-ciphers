export type { BaseCipherEncodingOptions as DESCipherEncodingOptions } from './options';

export type DESCipherAlgorithm = `des${'' | '-ede3' | '-ede'}-${DESCipherMode}`;
export type DESCipherMode = 'cbc' | 'cfb1' | 'cfb8' | 'cfb' | 'ecb' | 'ofb';
