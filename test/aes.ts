import consola from 'consola';

import AESCipher, { CCM, GCM } from '@/ciphers/aes';
import BaseAESEncryptAndDecrypt from '@/ciphers/aes/base/encryptAndDecrypt';

type JSONTestData = typeof jsonData;

const data = 'aes-ciphers';
const keys = {
	128: '0123456789abcdef',
	192: '0123456789abcdef01234567',
	256: '0123456789abcdef0123456789abcdef'
};

const jsonData = { value: data } as const;

export const runAESTest = () => {
	consola.info('AES');
	consola.info(`Origin data: ${data}`);
	consola.info(`Origin json data:`, jsonData);
	consola.info(`Key 128: ${keys[128]}`);
	consola.info(`Key 192: ${keys[192]}`);
	consola.info(`Key 256: ${keys[256]}`);
	const tests = [
		[AESCipher.CBC],
		[AESCipher.CCM, runHasAuthTagEncryprAndDecrypt],
		[AESCipher.CFB],
		[AESCipher.CFB1],
		[AESCipher.CFB8],
		[AESCipher.CTR],
		[AESCipher.ECB],
		[AESCipher.GCM, runHasAuthTagEncryprAndDecrypt],
		[AESCipher.OFB]
	] as const;

	tests.forEach(([cipherClass, runEncryprAndDecryptFunction]) => {
		consola.log('');
		consola.info(`${cipherClass.name}`);
		Object.entries(keys).forEach(([length, key]) => {
			// @ts-ignore
			(runEncryprAndDecryptFunction || runEncryprAndDecrypt)(new cipherClass(key), Number(length) as 128 | 192 | 256);
		});
	});

	consola.success('AES test success');
};

function runEncryprAndDecrypt(cipher: BaseAESEncryptAndDecrypt, length: 128 | 192 | 256) {
	const encryptedData = cipher.encrypt(data);
	const encryptedJSONData = cipher.encryptJSON(jsonData);
	if (!encryptedData || !encryptedJSONData) throw new Error(`Cipher: ${cipher.constructor.name} encrypt error`);
	consola.success(`${length} - data: ${encryptedData.data}, iv: ${encryptedData.iv}`);
	consola.success(`${length} - json data: ${encryptedJSONData.data}, iv: ${encryptedJSONData.iv}`);
	const decryptedData = cipher.decrypt(encryptedData.data, encryptedData.iv);
	const decryptedJSONData = cipher.decryptToJSON<JSONTestData>(encryptedJSONData.data, encryptedJSONData.iv);
	if (!decryptedData || decryptedData !== data || !decryptedJSONData || decryptedJSONData.value !== jsonData.value) throw new Error(`Cipher: ${cipher.constructor.name} decrypt error`);
}

function runHasAuthTagEncryprAndDecrypt(cipher: CCM | GCM, length: 128 | 192 | 256) {
	const encryptedData = cipher.encrypt(data);
	const encryptedJSONData = cipher.encryptJSON(jsonData);
	if (!encryptedData || !encryptedJSONData) throw new Error(`Cipher: ${cipher.constructor.name} encrypt error`);
	consola.success(`${length} - data: ${encryptedData.data}, iv: ${encryptedData.iv}, authTag: ${encryptedData.authTag}, authTagLength: ${encryptedData.authTagLength}`);
	consola.success(`${length} - json data: ${encryptedJSONData.data}, iv: ${encryptedJSONData.iv}, authTag: ${encryptedJSONData.authTag}, authTagLength: ${encryptedJSONData.authTagLength}`);
	const decryptedData = cipher.decrypt(encryptedData.data, encryptedData.iv, encryptedData.authTag, encryptedData.authTagLength);
	const decryptedJSONData = cipher.decryptToJSON<JSONTestData>(encryptedJSONData.data, encryptedJSONData.iv, encryptedJSONData.authTag, encryptedJSONData.authTagLength);
	if (!decryptedData || decryptedData !== data || !decryptedJSONData || decryptedJSONData.value !== jsonData.value) throw new Error(`Cipher: ${cipher.constructor.name} decrypt error`);
}
