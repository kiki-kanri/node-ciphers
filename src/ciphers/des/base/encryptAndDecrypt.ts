import { randomBytes, type BinaryLike } from 'crypto';
import type { TransformOptions } from 'stream';

import type { DESCipherEncodingOptions } from '@/types';
import BaseDESCipher from '.';

export abstract class BaseDESEncryptAndDecrypt extends BaseDESCipher {
	decrypt(encryptedData: BinaryLike, iv: BinaryLike, encodingOptions?: DESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		try {
			const decipher = this.createDecipher(typeof iv === 'string' ? Buffer.from(iv, encodingOptions?.iv || this.encodingOptions.iv) : iv, decipherOptions);
			return this.getDecipherResult(decipher, encryptedData, encodingOptions);
		} catch (error) {}
	}

	encrypt(data: BinaryLike, encodingOptions?: DESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		const iv = randomBytes(8);
		try {
			return {
				data: this.getCipherResult(this.createCipher(iv, cipherOptions), data, encodingOptions),
				iv: iv.toString(encodingOptions?.iv || this.encodingOptions.iv)
			};
		} catch (error) {}
	}
}

export default BaseDESEncryptAndDecrypt;
