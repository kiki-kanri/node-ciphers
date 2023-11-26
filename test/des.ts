import consola from 'consola';

import DESCipher from '@/ciphers/des';
import BaseDESEncryptAndDecrypt from '@/ciphers/des/base/encryptAndDecrypt';

type JSONTestData = typeof jsonData;

const data = 'des-ciphers';
const keys = {
	64: '01234567',
	128: '0123456789abcdef',
	192: '0123456789abcdef01234567'
};

const jsonData = { value: data } as const;

export const runDESTest = () => {
	consola.info('DES');
	consola.info(`Origin data: ${data}`);
	consola.info(`Key 64: ${keys[64]}`);
	consola.info(`Key 128: ${keys[128]}`);
	consola.info(`Key 192: ${keys[192]}`);
	const cipherClasses = [
		DESCipher.CBC,
		DESCipher.CFB,
		DESCipher.CFB1,
		DESCipher.CFB8,
		DESCipher.ECB,
		DESCipher.OFB
	] as const;

	cipherClasses.forEach((cipherClass) => {
		consola.log('');
		consola.info(`${cipherClass.name}`);
		Object.entries(keys).forEach(([length, key]) => {
			if (length === '128' && cipherClass.name.match(/cfb(1|8)/i)) return;
			// @ts-ignore
			runEncryprAndDecrypt(new cipherClass(key), Number(length) as 64 | 128 | 192);
		});
	});

	consola.success('DES test success');
};

function runEncryprAndDecrypt(cipher: BaseDESEncryptAndDecrypt, length: 64 | 128 | 192) {
	const encryptedData = cipher.encrypt(data);
	const encryptedJSONData = cipher.encryptJSON(jsonData);
	if (!encryptedData || !encryptedJSONData) throw new Error(`Cipher: ${cipher.constructor.name} encrypt error`);
	consola.success(`${length} - data: ${encryptedData.data}, iv: ${encryptedData.iv}`);
	consola.success(`${length} - json data: ${encryptedJSONData.data}, iv: ${encryptedJSONData.iv}`);
	const decryptedData = cipher.decrypt(encryptedData.data, encryptedData.iv);
	const decryptedJSONData = cipher.decryptToJSON<JSONTestData>(encryptedJSONData.data, encryptedJSONData.iv);
	if (!decryptedData || decryptedData !== data || !decryptedJSONData || decryptedJSONData.value !== jsonData.value) throw new Error(`Cipher: ${cipher.constructor.name} decrypt error`);
}
