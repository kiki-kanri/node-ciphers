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

	// CBC
	runCipherTest(AESCipher.CBC);
	console.log();

	// CCM
	runNeedAuthTagTest(AESCipher.CCM);
	console.log();

	// CFB
	runCipherTest(AESCipher.CFB);
	console.log();

	// CFB1
	runCipherTest(AESCipher.CFB1);
	console.log();

	// CFB8
	runCipherTest(AESCipher.CFB8);
	console.log();

	// CTR
	runCipherTest(AESCipher.CFB);
	console.log();

	// ECB
	// @ts-ignore
	runCipherTest(AESCipher.ECB);
	console.log();

	// GCM
	runNeedAuthTagTest(AESCipher.GCM);
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
