import consola from 'consola';

import AESCipher, { CCM, GCM } from '@/ciphers/aes';
import BaseAESCipher from '@/ciphers/aes/base';

const data = 'node-ciphers';
const key128 = '0123456789abcdef';
const key192 = '0123456789abcdef01234567';
const key256 = '0123456789abcdef0123456789abcdef';

export const runAESTest = () => {
	consola.info(`Origin data: ${data}`);
	consola.info(`Key 128: ${key128}`);
	consola.info(`Key 192: ${key192}`);
	consola.info(`Key 256: ${key256}`);
	console.log();
	// prettier-ignore
	const tests = [
		[runCipherTest, AESCipher.CBC],
		[runNeedAuthTagTest, AESCipher.CCM],
		[runCipherTest, AESCipher.CFB],
		[runCipherTest, AESCipher.CFB1],
		[runCipherTest, AESCipher.CFB8],
		[runCipherTest, AESCipher.CTR],
		[runCipherTest, AESCipher.ECB],
		[runNeedAuthTagTest, AESCipher.GCM],
		[runCipherTest, AESCipher.OFB]
	] as const;

	// prettier-ignore
	tests.forEach(([func, cipherClass]) => {
		// @ts-ignore
		func(cipherClass);
		console.log();
	});
};

function runCipherTest<T extends BaseAESCipher>(cipherClass: new (key: string) => T) {
	consola.info(cipherClass.name);
	const cipher128 = new cipherClass(key128);
	const cipher192 = new cipherClass(key192);
	const cipher256 = new cipherClass(key256);
	runEncryprAndDecrypt(cipher128, 128);
	runEncryprAndDecrypt(cipher192, 192);
	runEncryprAndDecrypt(cipher256, 256);
}

function runEncryprAndDecrypt(cipher: BaseAESCipher, length: 128 | 192 | 256) {
	const encryptedData = cipher.encrypt(data);
	if (!encryptedData) throw new Error(`${cipher}`);
	consola.success(`${length} - data: ${encryptedData.data}, iv: ${encryptedData.iv}`);
	const decryptedData = cipher.decrypt(encryptedData.data, encryptedData.iv);
	if (!decryptedData || decryptedData !== data) throw new Error(`${cipher}`);
}

function runNeedAuthTagEncryprAndDecrypt(cipher: CCM | GCM, length: 128 | 192 | 256) {
	const encryptedData = cipher.encrypt(data);
	if (!encryptedData) throw new Error(`${cipher}`);
	consola.success(`${length} - data: ${encryptedData.data}, iv: ${encryptedData.iv}, authTag: ${encryptedData.authTag}, authTagLength: ${encryptedData.authTagLength}`);
	const decryptedData = cipher.decrypt(encryptedData.data, encryptedData.iv, encryptedData.authTag, encryptedData.authTagLength);
	if (!decryptedData || decryptedData !== data) throw new Error(`${cipher}`);
}

function runNeedAuthTagTest<T extends CCM | GCM>(cipherClass: new (key: string) => T) {
	consola.info(cipherClass.name);
	const cipher128 = new cipherClass(key128);
	const cipher192 = new cipherClass(key192);
	const cipher256 = new cipherClass(key256);
	runNeedAuthTagEncryprAndDecrypt(cipher128, 128);
	runNeedAuthTagEncryprAndDecrypt(cipher192, 192);
	runNeedAuthTagEncryprAndDecrypt(cipher256, 256);
}