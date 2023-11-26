# node-ciphers

Easy-to-use cipher classes such as AES, DES, etc.

Documentation will be improved in future releases.

There is an example of aes-cbc below, you can also refer to the code in the test to use the package.

## Installation

```bash
npm i node-ciphers		# npm
pnpm add node-ciphers	# pnpm
```

## Examples

### AES-CBC

```typescript
import { AESCipher } from 'node-ciphers';

const cipher = AESCipher.CBC('key');

// Encrypt
const encryptResult = cipher.encrypt('your data');
console.log(encryptResult);
/**
 * {
 * 		data: 'encryptedText',
 * 		iv: 'iv string'
 * }
 */

// Decrypt
console.log(cipher.decrypt(encryptResult.data, encryptResult.iv));
// 'your data'
```

If an encryption/decryption error occurs, undefined will be returned.

If the incoming key is a string, it will be converted to a buffer using utf8 by default.

Depending on the length of the key, AES-128, AES-192 or AES-256 mode will be used to create the cipher instance.

- 16 bytes for AES-128
- 24 bytes for AES-192
- 32 bytes for AES-256
