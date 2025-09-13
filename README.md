# node-ciphers

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]
[![FOSSA Status][fossa-src]][fossa-href]

Lightweight AES and DES encryption library for Node.js, featuring flexible encoding, multiple cipher modes, and TypeScript support.

- [✨ Release Notes](./CHANGELOG.md)

## Features

- 🔒 AES and DES encryption/decryption with support for most cipher modes (CBC, CFB, CTR, ECB, GCM, OFB, CCM, etc.)
- 🧠 Automatic key size detection and mode selection (AES-128, AES-192, AES-256 based on key bytes length)
- 📦 Built-in JSON encryption/decryption methods for structured data
- 🛡️ Robust error handling: methods return a Rust-like `Result` object with `ok`, `value`, and `error` fields instead of throwing exceptions
- ⚙️ Customizable encoding settings for keys, IVs, and data, with per-call overrides supported
- 🧩 Fully type-safe, written in TypeScript
- 🧪 Comprehensive test coverage
- 🎲 Automatic IV generation: a new IV is randomly generated for every encryption operation

## Requirements

- **Node.js** `>= 22.0.0`

## Installation

Using [pnpm](https://pnpm.io):

```bash
pnpm add node-ciphers
```

You can also use `yarn`, `npm`, or `bun`.

## Usage

There is no `try-catch` in the example code. For convenience, all encryption and decryption methods internally handle errors and return a value with the following type:

```typescript
type Result<T> = { error: unknown; ok: false; value: undefined } | { ok: true; value: T };
```

This allows you to easily check `.ok` or `value === undefined` for early returns or error handling.

Cipher instances can be reused; you do not need to create a new cipher for each encryption or decryption.

The encryption method returns a `Result.value` object containing `data` and `iv`, both of type `string`. The `iv` is automatically generated during encryption.

### AES

Below are examples of AES CBC encryption and decryption:

```typescript
import * as AesCiphers from 'node-ciphers/aes';

const data = 'test';
const jsonData = { value: data };

// 128 bits CBC (16 bytes key)
const cipher = new AesCiphers.Cbc('0123456789abcdef');
console.log(cipher.algorithm);

// Encrypt text
const encryptResult = cipher.encrypt(data);
console.log(encryptResult);
if (!encryptResult.ok) throw encryptResult.error;

// Decrypt text
const decryptResult = cipher.decrypt(encryptResult.value.data, encryptResult.value.iv);
console.log(decryptResult);
if (!decryptResult.ok) throw decryptResult.error;

// Encrypt JSON
const encryptJsonResult = cipher.encryptJson(jsonData);
console.log(encryptJsonResult);
if (!encryptJsonResult.ok) throw encryptJsonResult.error;

// Decrypt JSON
const decryptedJsonResult = cipher.decryptToJson(encryptJsonResult.value.data, encryptJsonResult.value.iv);
console.log(decryptedJsonResult);
if (!decryptedJsonResult.ok) throw decryptedJsonResult.error;
```

AES encryption supports three key lengths: 128-bit, 192-bit, and 256-bit, corresponding to 16, 24, and 32 bytes.

When creating a cipher instance, the `key` is automatically converted into a buffer. Its length is validated, and the appropriate mode is selected based on the length. It also checks whether the mode is supported in the current runtime environment.

For details about the automatic conversion of keys to buffers, please refer to [this section](#encoding-and-decoding).

For AES-CCM and AES-GCM modes, encryption and decryption methods require additional parameters related to the authentication tag.

> [!IMPORTANT]
> In Node.js, the results of CFB, CFB1, and CFB8 encryption modes may differ from those in other programming languages due to differences in how the **block size** and **feedback unit size** are handled internally during encryption and decryption.
>
> - **CFB Mode**: Typically operates on a full block (commonly 128 bits) but allows different feedback unit sizes (e.g., 1 bit, 8 bits, or full block size). The feedback size directly impacts the encryption process.
> - **CFB1**, **CFB8**, and **CFB**: These modes use 1-bit, 8-bit, and full-block feedback sizes, respectively. The internal handling of these feedback sizes can vary across different programming languages or cryptographic libraries, potentially leading to different results even with the same key and IV.
>
> The key difference arises from how the **feedback block** is processed internally, causing inconsistencies in encryption outputs across implementations.

### DES

The usage is similar to AES, but the supported key lengths and modes differ:

- 8 bytes (DES)
- 16 bytes (DES-EDE)
- 24 bytes (DES-EDE3)

```typescript
import * as DesCiphers from 'node-ciphers/des';

const data = 'test';
const jsonData = { value: data };

// DES-EDE3 (3DES) (24 bytes key)
const cipher = new DesCiphers.Cbc('0123456789abcdef01234567');
console.log(cipher.algorithm);

// Encrypt text
const encryptResult = cipher.encrypt(data);
console.log(encryptResult);
if (!encryptResult.ok) throw encryptResult.error;

// Decrypt text
const decryptResult = cipher.decrypt(encryptResult.value.data, encryptResult.value.iv);
console.log(decryptResult);
if (!decryptResult.ok) throw decryptResult.error;

// Encrypt JSON
const encryptJsonResult = cipher.encryptJson(jsonData);
console.log(encryptJsonResult);
if (!encryptJsonResult.ok) throw encryptJsonResult.error;

// Decrypt JSON
const decryptedJsonResult = cipher.decryptToJson(encryptJsonResult.value.data, encryptJsonResult.value.iv);
console.log(decryptedJsonResult);
if (!decryptedJsonResult.ok) throw decryptedJsonResult.error;
```

> [!IMPORTANT]
> Standard DES mode (8-byte key length) has been disabled. Attempting to use it will result in an `Invalid algorithm` error. To enable it, you must set the environment variable `NODE_OPTIONS=--openssl-legacy-provider`.

### Encoding and Decoding

You can customize how the key, IV, and data are encoded and decoded during encryption and decryption.

```typescript
// Create a cipher that loads the key using ASCII encoding
const cbc192Cipher = new AesCiphers.Cbc('😊😊😊😊😊😊😊😊😊😊😊😊', { key: 'ascii' });
console.log(cbc192Cipher.algorithm); // aes-192-cbc

// Create a cipher that defaults to base64 for encrypting output and expects base64 input for decryption
const cipher = new AesCiphers.Cbc(
    '0123456789abcdef',
    {
        decryptInput: 'base64',
        encryptOutput: 'base64'
    }
);

// Override the output encoding to hex for this encryption call only
cipher.encrypt('test', { encryptOutput: 'hex' });

// Override the IV encoding to base64 for this encryption call only
cipher.encrypt('test', { iv: 'base64' });
```

Default encoding options:

```typescript
const defaultEncodingOptions = {
    authTag: 'hex',
    decryptInput: 'hex',
    decryptOutput: 'utf-8',
    encryptInput: 'utf-8',
    encryptOutput: 'hex',
    iv: 'hex',
    key: 'utf-8',
};
```

If decryption fails, it may be because the encoding settings do not match the format of the provided data.

## Available Ciphers

### AES

- CBC
- CCM
- CFB
- CFB1
- CFB8
- CTR
- ECB
- GCM
- OFB

### DES

- CBC
- CFB
- CFB1
- CFB8
- ECB
- OFB

## License

[MIT License](./LICENSE)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fkiki-kanri%2Fnode-ciphers.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fkiki-kanri%2Fnode-ciphers?ref=badge_large)

<!-- Badges -->
[npm-version-href]: https://npmjs.com/package/node-ciphers
[npm-version-src]: https://img.shields.io/npm/v/node-ciphers/latest.svg?colorA=18181b&colorB=28cf8d&style=flat

[npm-downloads-href]: https://npmjs.com/package/node-ciphers
[npm-downloads-src]: https://img.shields.io/npm/dm/node-ciphers.svg?colorA=18181b&colorB=28cf8d&style=flat

[codecov-href]: https://codecov.io/gh/kiki-kanri/node-ciphers
[codecov-src]: https://codecov.io/gh/kiki-kanri/node-ciphers/graph/badge.svg?token=RNU7FNG8HD

[license-href]: https://github.com/kiki-kanri/node-ciphers/blob/main/LICENSE
[license-src]: https://img.shields.io/github/license/kiki-kanri/node-ciphers?colorA=18181b&colorB=28cf8d&style=flat

[fossa-href]: https://app.fossa.com/projects/git%2Bgithub.com%2Fkiki-kanri%2Fnode-ciphers?ref=badge_shield
[fossa-src]: https://app.fossa.com/api/projects/git%2Bgithub.com%2Fkiki-kanri%2Fnode-ciphers.svg?type=shield
