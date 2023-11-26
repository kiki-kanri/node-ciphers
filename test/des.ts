import consola from 'consola';

import DESCipher from '@/ciphers/des';
import BaseDESEncryptAndDecrypt from '@/ciphers/des/base/encryptAndDecrypt';

const data = 'des-ciphers';
const keys = {
	64: '01234567',
	128: '0123456789abcdef',
	192: '0123456789abcdef01234567'
};

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
	if (!encryptedData) throw new Error(`Cipher: ${cipher.constructor.name} encrypt error`);
	consola.success(`${length} - data: ${encryptedData.data}, iv: ${encryptedData.iv}`);
	const decryptedData = cipher.decrypt(encryptedData.data, encryptedData.iv);
	if (!decryptedData || decryptedData !== data) throw new Error(`Cipher: ${cipher.constructor.name} decrypt error`);
}
