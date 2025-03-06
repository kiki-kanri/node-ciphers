# node-ciphers

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]
[![FOSSA Status][fossa-src]][fossa-href]

A lightweight Node.js library for AES and DES encryption, offering flexible encoding options, support for various cipher modes, and seamless integration with streams.

- [✨ Release Notes](./CHANGELOG.md)

### Features

- 🔒 **AES and DES Encryption**: Provides robust implementations for both AES and DES encryption algorithms, with support for various modes like CBC, CCM, and more
- 🧰 **Flexible Encoding Options**: Customize encoding settings for encryption and decryption to suit your needs
- 🔄 **Encrypt and Decrypt JSON**: Easily encrypt and decrypt JSON data directly, simplifying the handling of structured data
- 📜 **Mode Support**: Includes CBC, CCM, CFB, CTR, ECB, GCM, and OFB modes
- ⚙️ **Stream Transformations**: Seamlessly integrate with Node.js streams, allowing for encrypted data processing on-the-fly with transformation options
- 🔑 **Dynamic Key Handling**: Automatically handles key lengths and their corresponding mode prefixes for both AES and DES, ensuring secure and correct key usage
- 📂 **Modular Architecture**: Well-structured codebase with modular components, making it easy to extend and maintain

## Environment Requirements

- Node.js version 18 or higher

## Installation

Add dependency (example using pnpm).

```bash
pnpm add node-ciphers
```

You can also use yarn, npm, or bun to add the dependency.

That's it! You're ready to use this package in your project. Check out the [available ciphers](#available-ciphers) and [usage](#usage) instructions below ✨.

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

## Usage

### AES

Below are examples of AES CBC and ECB encryption and decryption:

```typescript
import { AesCipher } from 'node-ciphers';

const data = 'test';
const jsonData = { value: data };

// 128 bits cbc (16 bytes length key)
const cbcCipher = new AesCipher.Cbc('0123456789abcdef');
console.log(cbcCipher.algorithm);
const cbcEncryptResult = cbcCipher.encrypt(data);
const cbcEncryptJsonResult = cbcCipher.encryptJson(jsonData);
console.log(cbcEncryptResult);
console.log(cbcEncryptJsonResult);
if (!cbcEncryptResult || !cbcEncryptJsonResult) throw new Error('Encrypt failed');
console.log(cbcCipher.decrypt(cbcEncryptResult.data, cbcEncryptResult.iv));
console.log(cbcCipher.decryptToJson(cbcEncryptJsonResult.data, cbcEncryptJsonResult.iv));

// 128 bits ecb (16 bytes length key)
const ecbCipher = new AesCipher.Ecb('0123456789abcdef');
console.log(ecbCipher.algorithm);
const ecbEncryptResult = ecbCipher.encrypt(data);
const ecbEncryptJsonResult = ecbCipher.encryptJson(jsonData);
console.log(ecbEncryptResult);
console.log(ecbEncryptJsonResult);
if (!ecbEncryptResult || !ecbEncryptJsonResult) throw new Error('Encrypt failed');
console.log(ecbCipher.decrypt(ecbEncryptResult.data));
console.log(ecbCipher.decryptToJson(ecbEncryptJsonResult.data));
```

The cipher's encryption and decryption methods can be reused; there's no need to create a new one each time.

The encryption result is consistently an object with a data property containing the encrypted output and an iv property representing the randomly generated initialization vector (IV) for that encryption. To maintain a uniform structure, the iv property will still be included and return null in ECB mode, even though ECB does not use an IV.

AES encryption supports three key lengths: 128-bit, 192-bit, and 256-bit. These correspond to 16, 24, and 32 bytes, respectively.

When the provided key for creating a cipher is a string, it will be internally converted into a buffer and its byte length will be checked. The default encoding used for converting to a buffer is UTF-8, which may cause a difference between the character length and the byte length. To avoid errors, you can directly provide a key of the `Buffer` type when creating the cipher, or set the `key` option in the options parameter.

```typescript
import { Buffer } from 'node:buffer';

// 192 bits cbc (24 bytes length key)
const cbcCipher192 = new AesCipher.Cbc('😊😊😊😊😊😊😊😊😊😊😊😊', { key: 'ascii' });
console.log(cbcCipher192.algorithm); // aes-192-cbc

// 256 bits ecb (32 bytes length key)
const key = Buffer.from('😊😊😊😊😊😊😊😊', 'utf8');
const ecbCipher256 = new AesCipher.Ecb(key);
console.log(ecbCipher256.algorithm); // aes-256-cbc
```

Some AES ciphers, such as CCM and GCM, require additional parameters during encryption and decryption.

> [!IMPORTANT]
> In Node.js, the results of CFB, CFB1, and CFB8 encryption modes may differ from those in other programming languages due to differences in how the **block size** and **feedback unit size** are handled during encryption and decryption.
>
> - **CFB Mode**: Typically operates on a full block (often 128 bits) but allows for different feedback unit sizes (e.g., 1 bit, 8 bits, or 128 bits). This feedback size directly affects how the encryption and decryption processes are carried out.
> - **CFB1, CFB8, and CFB**: These modes use 1-bit, 8-bit, and full-block feedback sizes, respectively. The way these feedback sizes are implemented can vary across different programming languages or libraries, which may lead to different results even under the same conditions (e.g., same IV and key).
>
> The key difference arises because of how the **feedback block size** is processed internally by different libraries, leading to potential inconsistencies in the encryption output.

### DES

The usage is similar to AES, but the key's byte length corresponds to the following modes: 8 bytes (DES), 16 bytes (DES-EDE), and 24 bytes (DES-EDE3).

```typescript
import { DesCipher } from 'node-ciphers';

const data = 'test';
const jsonData = { value: data };

// des-ede (16 bytes length key)
const cbcCipher = new DesCipher.Cbc('0123456789abcdef');
console.log(cbcCipher.algorithm);
const cbcEncryptResult = cbcCipher.encrypt(data);
const cbcEncryptJsonResult = cbcCipher.encryptJson(jsonData);
console.log(cbcEncryptResult);
console.log(cbcEncryptJsonResult);
if (!cbcEncryptResult || !cbcEncryptJsonResult) throw new Error('Encrypt failed');
console.log(cbcCipher.decrypt(cbcEncryptResult.data, cbcEncryptResult.iv));
console.log(cbcCipher.decryptToJson(cbcEncryptJsonResult.data, cbcEncryptJsonResult.iv));

// des-ede3, 3des (24 bytes length key)
const ecbCipher = new DesCipher.Ecb('0123456789abcdef01234567');
console.log(ecbCipher.algorithm);
const ecbEncryptResult = ecbCipher.encrypt(data);
const ecbEncryptJsonResult = ecbCipher.encryptJson(jsonData);
console.log(ecbEncryptResult);
console.log(ecbEncryptJsonResult);
if (!ecbEncryptResult || !ecbEncryptJsonResult) throw new Error('Encrypt failed');
console.log(ecbCipher.decrypt(ecbEncryptResult.data));
console.log(ecbCipher.decryptToJson(ecbEncryptJsonResult.data));
```

> [!IMPORTANT]
> Standard DES mode (8-byte key length) has been disabled. Attempting to use it will result in an `Invalid algorithm` error. To enable it, you need to set the `NODE_OPTIONS=--openssl-legacy-provider` environment variable.

> [!IMPORTANT]
> In the Bun, some ciphers or specific key lengths are currently unavailable.

## Encoding

You can customize the data transformation encoding for encryption and decryption inputs and outputs.

```typescript
// Create a cipher that outputs encryption results in Base64 and accepts encryption input in Base64 format
const cbcCipher = new AesCipher.Cbc(
    '0123456789abcdef',
    {
        decryptInput: 'base64',
        encryptOutput: 'base64'
    }
);

// Use hex output for this encryption only
cbcCipher.encrypt('test', { encryptOutput: 'hex' });

// Output the IV in Base64 format
cbcCipher.encrypt('test', { iv: 'base64' });
```

If the encrypted data cannot be decrypted, it may be due to not specifying the corresponding encoding. Please pay attention to encoding settings when using it. For default encoding values, refer to the `BaseCipherEncodingOptions` interface in [this file](./src/types/options.ts).

## License

[MIT License](./LICENSE)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fkiki-kanri%2Fnode-ciphers.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fkiki-kanri%2Fnode-ciphers?ref=badge_large)

<!-- Badges -->
[fossa-href]: https://app.fossa.com/projects/git%2Bgithub.com%2Fkiki-kanri%2Fnode-ciphers?ref=badge_shield
[fossa-src]: https://app.fossa.com/api/projects/git%2Bgithub.com%2Fkiki-kanri%2Fnode-ciphers.svg?type=shield

[npm-version-href]: https://npmjs.com/package/node-ciphers
[npm-version-src]: https://img.shields.io/npm/v/node-ciphers/latest.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-downloads-href]: https://npmjs.com/package/node-ciphers
[npm-downloads-src]: https://img.shields.io/npm/dm/node-ciphers.svg?style=flat&colorA=18181B&colorB=28CF8D

[codecov-href]: https://codecov.io/gh/kiki-kanri/node-ciphers
[codecov-src]: https://codecov.io/gh/kiki-kanri/node-ciphers/graph/badge.svg?token=RNU7FNG8HD

[license-href]: https://github.com/kiki-kanri/kikiutils-node-classes/blob/main/LICENSE
[license-src]: https://img.shields.io/npm/l/node-ciphers.svg?style=flat&colorA=18181B&colorB=28CF8D
