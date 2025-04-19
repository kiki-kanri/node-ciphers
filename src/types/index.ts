export type * from './aes';
export type * from './des';
export type * from './options';

export type BaseEncryptResult = Result<{ data: string; iv: string }>;
export type EcbEncryptResult = Result<{ data: string; iv: null }>;
export type Result<T> = { error: unknown; ok: false; value?: never } | { ok: true; value: T };
