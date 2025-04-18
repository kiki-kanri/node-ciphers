export type * from './aes';
export type * from './des';
export type * from './options';

export type Result<T> = { error: unknown; ok: false } | { ok: true; value: T };
