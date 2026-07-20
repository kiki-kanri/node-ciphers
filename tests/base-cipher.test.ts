import { Buffer } from 'node:buffer';
import type { BinaryLike } from 'node:crypto';

import {
    describe,
    it,
} from 'vitest';

import { BaseCipher } from '../src/_internals/base-cipher';

class TestCipher extends BaseCipher {
    normalize(data: BinaryLike) {
        return this.dataToBuffer(data, 'utf-8');
    }
}

describe.concurrent('base cipher', () => {
    it('should preserve existing array buffer views', ({ expect }) => {
        const cipher = new TestCipher();
        const data = new Uint8Array([
            1,
            2,
            3,
        ]);

        expect(cipher.normalize(data)).toBe(data);
    });

    it('should normalize raw array buffers', ({ expect }) => {
        const cipher = new TestCipher();
        const data = Uint8Array.from([
            1,
            2,
            3,
        ]).buffer;

        expect(cipher.normalize(data)).toEqual(Buffer.from(data));
    });
});
