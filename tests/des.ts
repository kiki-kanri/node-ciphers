import consola from 'consola';

import DESCipher from '@/ciphers/des';
import BaseDESEncryptAndDecrypt from '@/ciphers/des/base/encryptAndDecrypt';

const data = 'des-ciphers';
const key = '01234567';

export const runDESTest = () => {
	consola.info('DES');
	consola.info(`Origin data: ${data}`);
	consola.info(`Key: ${key}`);
	const tests = [
		DESCipher.CBC,
		DESCipher.CFB,
		DESCipher.CFB1,
		DESCipher.CFB8,
		DESCipher.ECB,
		DESCipher.OFB
	] as const;

	tests.forEach((cipherClass) => {
		consola.log('');
		consola.info(`${cipherClass.name}`);
		// @ts-ignore
		runEncryprAndDecrypt(new cipherClass(key));
	});

	consola.success('DES test success');
};

function runEncryprAndDecrypt(cipher: BaseDESEncryptAndDecrypt) {
	const encryptedData = cipher.encrypt(data);
	if (!encryptedData) throw new Error(`Cipher: ${cipher.constructor.name} encrypt error`);
	consola.success(`Data: ${encryptedData.data}, iv: ${encryptedData.iv}`);
	const decryptedData = cipher.decrypt(encryptedData.data, encryptedData.iv);
	if (!decryptedData || decryptedData !== data) throw new Error(`Cipher: ${cipher.constructor.name} decrypt error`);
}
