import crypto from 'crypto';
import type { TransformOptions } from 'stream';

import type { AESCipherEncodingOptions } from '@/types';
import BaseAESCipher from '.';

export abstract class BaseAESEncryptAndDecrypt extends BaseAESCipher {
	decrypt(encryptedData: string, iv: Buffer | string, encodingOptions?: AESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		try {
			const decipher = this.createDecipher(iv instanceof Buffer ? iv : Buffer.from(iv, encodingOptions?.iv || this.encodingOptions.iv), decipherOptions);
			return this.getDecipherResult(decipher, encryptedData, encodingOptions);
		} catch (_) {}
	}

	encrypt(data: Buffer | string, encodingOptions?: AESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		const iv = crypto.randomBytes(16);
		try {
			return {
				data: this.getCipherResult(this.createCipher(iv, cipherOptions), data, encodingOptions),
				iv: iv.toString(encodingOptions?.iv || this.encodingOptions.iv)
			};
		} catch (_) {}
	}
}

export default BaseAESEncryptAndDecrypt;
