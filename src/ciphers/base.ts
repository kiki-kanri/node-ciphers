export class BaseCipher {
	protected parseJSON<T>(data?: string) {
		if (data === undefined) return;
		try {
			return JSON.parse(data) as T;
		} catch (error) {}
	}
}

export default BaseCipher;
