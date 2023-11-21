# Changelog

## v0.5.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v0.4.0...v0.5.0)

### 🚀 Enhancements

- Add des base classes and types ([20bbbfe](https://github.com/kiki-kanri/node-ciphers/commit/20bbbfe))
- Add des cbc, cfb, cfb1, cfb8, ecb, ofb ciphers ([a3ce6d6](https://github.com/kiki-kanri/node-ciphers/commit/a3ce6d6))
- Add des tests and update data in aes tests ([3257b55](https://github.com/kiki-kanri/node-ciphers/commit/3257b55))
- Implement export functionality for DES ciphers ([ce17d52](https://github.com/kiki-kanri/node-ciphers/commit/ce17d52))

### 🩹 Fixes

- Correct encodingOptions type for aes ccm and gcm encryption/decryption ([994b00f](https://github.com/kiki-kanri/node-ciphers/commit/994b00f))

### 💅 Refactors

- Simplify test code ([f8b32f4](https://github.com/kiki-kanri/node-ciphers/commit/f8b32f4))
- Split options interface into smaller interfaces ([a9530d3](https://github.com/kiki-kanri/node-ciphers/commit/a9530d3))
- Consolidate constants into a single file ([2ed5ed0](https://github.com/kiki-kanri/node-ciphers/commit/2ed5ed0))

### 📖 Documentation

- Update keywords list in package.json ([3e64eaa](https://github.com/kiki-kanri/node-ciphers/commit/3e64eaa))

### 🏡 Chore

- Upgrade dependencies ([fbc92d4](https://github.com/kiki-kanri/node-ciphers/commit/fbc92d4))
- Upgrade dependencies ([b773fae](https://github.com/kiki-kanri/node-ciphers/commit/b773fae))

### ❤️ Contributors

- kiki-kanri

## v0.4.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v0.3.0...v0.4.0)

### 🚀 Enhancements

- Change authTag, data, key, and iv to allow BinaryLike type ([2edecdd](https://github.com/kiki-kanri/node-ciphers/commit/2edecdd))

### 💅 Refactors

- Split base class and simplify ciphers implementations ([8f7a11a](https://github.com/kiki-kanri/node-ciphers/commit/8f7a11a))
- Update import syntax ([e608dd8](https://github.com/kiki-kanri/node-ciphers/commit/e608dd8))
- Rename catch clause variable from _ to error ([d2fbbd8](https://github.com/kiki-kanri/node-ciphers/commit/d2fbbd8))
- Streamline aes ecb decryption code ([b1d270a](https://github.com/kiki-kanri/node-ciphers/commit/b1d270a))
- Simplify type names ([5c67b34](https://github.com/kiki-kanri/node-ciphers/commit/5c67b34))
- Rename test functions ([3d3f5ac](https://github.com/kiki-kanri/node-ciphers/commit/3d3f5ac))
- Relocate tests directory and update code ([dcf2e71](https://github.com/kiki-kanri/node-ciphers/commit/dcf2e71))
- Update error messages in tests ([9b7cbef](https://github.com/kiki-kanri/node-ciphers/commit/9b7cbef))
- Remove reassignment of 'data' variable ([cae2856](https://github.com/kiki-kanri/node-ciphers/commit/cae2856))

### ❤️ Contributors

- kiki-kanri

## v0.3.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v0.2.0...v0.3.0)

### 🚀 Enhancements

- Add author and keywords to package.json ([33df006](https://github.com/kiki-kanri/node-ciphers/commit/33df006))
- Allow passing cipher options in encrypt and decrypt methods ([cc102ed](https://github.com/kiki-kanri/node-ciphers/commit/cc102ed))
- Add aes ccm and gcm ciphers and types ([fd6d3a2](https://github.com/kiki-kanri/node-ciphers/commit/fd6d3a2))
- Add aes ciphers test functions ([7732be7](https://github.com/kiki-kanri/node-ciphers/commit/7732be7))
- Add aes ofb cipher ([40041c7](https://github.com/kiki-kanri/node-ciphers/commit/40041c7))

### 💅 Refactors

- Remove conversion assignment of data in encryption process ([169aca4](https://github.com/kiki-kanri/node-ciphers/commit/169aca4))
- Remove null type from iv parameter in decrypt method ([a2693c4](https://github.com/kiki-kanri/node-ciphers/commit/a2693c4))
- Restructure test code ([e8ca178](https://github.com/kiki-kanri/node-ciphers/commit/e8ca178))

### 📖 Documentation

- Update keywords list in package.json ([1e02ca6](https://github.com/kiki-kanri/node-ciphers/commit/1e02ca6))

### ❤️ Contributors

- kiki-kanri

## v0.2.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v0.1.0...v0.2.0)

### 🚀 Enhancements

- Add base aes cipher class and types ([946c478](https://github.com/kiki-kanri/node-ciphers/commit/946c478))
- Add algorithm getter to BaseAESCipher class ([12f8aeb](https://github.com/kiki-kanri/node-ciphers/commit/12f8aeb))
- Add aes cbc, cfb, cfb1, cfb8 and ctr ciphers ([2465dbe](https://github.com/kiki-kanri/node-ciphers/commit/2465dbe))
- Set index export aes ciphers ([10e61f2](https://github.com/kiki-kanri/node-ciphers/commit/10e61f2))
- Add consola package ([1f403d1](https://github.com/kiki-kanri/node-ciphers/commit/1f403d1))
- Add ecb cipher ([d9fe239](https://github.com/kiki-kanri/node-ciphers/commit/d9fe239))

### 💅 Refactors

- Remove bun files and use tsx to run dev ([a116598](https://github.com/kiki-kanri/node-ciphers/commit/a116598))
- Rename AvailableAESMode to AvailableAESCipherMode ([f6ab061](https://github.com/kiki-kanri/node-ciphers/commit/f6ab061))
- Move check key and get algorithm into constructor block ([0924aa3](https://github.com/kiki-kanri/node-ciphers/commit/0924aa3))

### 🏡 Chore

- Add node types ([affcb81](https://github.com/kiki-kanri/node-ciphers/commit/affcb81))
- Set engines and type in package.json ([b1ea979](https://github.com/kiki-kanri/node-ciphers/commit/b1ea979))
- Add build tool and script ([a195c3e](https://github.com/kiki-kanri/node-ciphers/commit/a195c3e))
- Upgrade dependencies ([cb342d0](https://github.com/kiki-kanri/node-ciphers/commit/cb342d0))

### ❤️ Contributors

- kiki-kanri

## v0.1.1

### 📖 Documentation

- Add readme ([d119e9f](https://github.com/kiki-kanri/node-ciphers/commit/d119e9f))

### 🏡 Chore

- Add base files ([ab1d42c](https://github.com/kiki-kanri/node-ciphers/commit/ab1d42c))

### ❤️ Contributors

- kiki-kanri
