import { randomBytes } from 'node:crypto';
import type { BinaryLike } from 'node:crypto';
import type { TransformOptions } from 'node:stream';

import type { DESCipherEncodingOptions } from '../../../types';

import BaseDESCipher from '.';

export abstract class BaseDESEncryptAndDecrypt extends BaseDESCipher {
	decrypt(encryptedData: BinaryLike, iv: BinaryLike, encodingOptions?: DESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		try {
			const decipher = this.createDecipher(this.dataToBuffer(iv, encodingOptions?.iv || this.encodingOptions.iv), decipherOptions);
			return this.getDecipherResult(decipher, encryptedData, encodingOptions);
		} catch {}
	}

	decryptToJSON<T = any>(encryptedData: BinaryLike, iv: BinaryLike, encodingOptions?: DESCipherEncodingOptions.Decrypt, decipherOptions?: TransformOptions) {
		return this.parseJSON<T>(this.decrypt(encryptedData, iv, encodingOptions, decipherOptions));
	}

	encrypt(data: BinaryLike, encodingOptions?: DESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		const iv = randomBytes(8);
		try {
			return {
				data: this.getCipherResult(this.createCipher(iv, cipherOptions), data, encodingOptions),
				iv: iv.toString(encodingOptions?.iv || this.encodingOptions.iv),
			};
		} catch {}
	}

	encryptJSON(data: any, encodingOptions?: DESCipherEncodingOptions.Encrypt, cipherOptions?: TransformOptions) {
		return this.encrypt(JSON.stringify(data), encodingOptions, cipherOptions);
	}
}

export default BaseDESEncryptAndDecrypt;
