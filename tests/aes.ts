import consola from 'consola';

import AESCipher, { CCM, GCM } from '@/ciphers/aes';
import BaseAESEncryptAndDecrypt from '@/ciphers/aes/base/encryptAndDecrypt';

const data = 'node-ciphers';
const key128 = '0123456789abcdef';
const key192 = '0123456789abcdef01234567';
const key256 = '0123456789abcdef0123456789abcdef';

export const runAESTest = () => {
	consola.info(`Origin data: ${data}`);
	consola.info(`Key 128: ${key128}`);
	consola.info(`Key 192: ${key192}`);
	consola.info(`Key 256: ${key256}`);
	// prettier-ignore
	const tests = [
		[runCipherTest, AESCipher.CBC],
		[runHasAuthTagTest, AESCipher.CCM],
		[runCipherTest, AESCipher.CFB],
		[runCipherTest, AESCipher.CFB1],
		[runCipherTest, AESCipher.CFB8],
		[runCipherTest, AESCipher.CTR],
		[runCipherTest, AESCipher.ECB],
		[runHasAuthTagTest, AESCipher.GCM],
		[runCipherTest, AESCipher.OFB]
	] as const;

	// prettier-ignore
	tests.forEach(([func, cipherClass]) => {
		console.log();
		// @ts-ignore
		func(cipherClass);
	});
};

function runCipherTest<T extends BaseAESEncryptAndDecrypt>(cipherClass: new (key: string) => T) {
	consola.info(cipherClass.name);
	const cipher128 = new cipherClass(key128);
	const cipher192 = new cipherClass(key192);
	const cipher256 = new cipherClass(key256);
	runEncryprAndDecrypt(cipher128, 128);
	runEncryprAndDecrypt(cipher192, 192);
	runEncryprAndDecrypt(cipher256, 256);
}

function runEncryprAndDecrypt(cipher: BaseAESEncryptAndDecrypt, length: 128 | 192 | 256) {
	const encryptedData = cipher.encrypt(data);
	if (!encryptedData) throw new Error(`${cipher}`);
	consola.success(`${length} - data: ${encryptedData.data}, iv: ${encryptedData.iv}`);
	const decryptedData = cipher.decrypt(encryptedData.data, encryptedData.iv);
	if (!decryptedData || decryptedData !== data) throw new Error(`${cipher}`);
}

function runHasAuthTagEncryprAndDecrypt(cipher: CCM | GCM, length: 128 | 192 | 256) {
	const encryptedData = cipher.encrypt(data);
	if (!encryptedData) throw new Error(`${cipher}`);
	consola.success(`${length} - data: ${encryptedData.data}, iv: ${encryptedData.iv}, authTag: ${encryptedData.authTag}, authTagLength: ${encryptedData.authTagLength}`);
	const decryptedData = cipher.decrypt(encryptedData.data, encryptedData.iv, encryptedData.authTag, encryptedData.authTagLength);
	if (!decryptedData || decryptedData !== data) throw new Error(`${cipher}`);
}

function runHasAuthTagTest<T extends CCM | GCM>(cipherClass: new (key: string) => T) {
	consola.info(cipherClass.name);
	const cipher128 = new cipherClass(key128);
	const cipher192 = new cipherClass(key192);
	const cipher256 = new cipherClass(key256);
	runHasAuthTagEncryprAndDecrypt(cipher128, 128);
	runHasAuthTagEncryprAndDecrypt(cipher192, 192);
	runHasAuthTagEncryprAndDecrypt(cipher256, 256);
}
