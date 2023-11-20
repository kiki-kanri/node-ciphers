import { randomBytes, type BinaryLike } from 'crypto';
import type { TransformOptions } from 'stream';

import type { AESCipherEncodingOptions } from '@/types';
import BaseAESCipher from '.';

export abstract class BaseAESEncryptAndDecrypt extends BaseAESCipher {
	decrypt(encryptedData: BinaryLike, iv: BinaryLike, encodingOptions?: AESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		try {
			const decipher = this.createDecipher(typeof iv === 'string' ? Buffer.from(iv, encodingOptions?.iv || this.encodingOptions.iv) : iv, decipherOptions);
			return this.getDecipherResult(decipher, encryptedData, encodingOptions);
		} catch (error) {}
	}

	encrypt(data: BinaryLike, encodingOptions?: AESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		const iv = randomBytes(16);
		try {
			return {
				data: this.getCipherResult(this.createCipher(iv, cipherOptions), data, encodingOptions),
				iv: iv.toString(encodingOptions?.iv || this.encodingOptions.iv)
			};
		} catch (error) {}
	}
}

export default BaseAESEncryptAndDecrypt;
