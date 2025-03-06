export type { BaseCipherEncodingOptions as DesCipherEncodingOptions } from './options';

export type DesCipherAlgorithm = `des${'' | '-ede3' | '-ede'}-${DesCipherMode}`;
export type DesCipherMode = 'cbc' | 'cfb1' | 'cfb8' | 'cfb' | 'ecb' | 'ofb';
