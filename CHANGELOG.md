# Changelog

## v6.1.5

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v6.1.4...v6.1.5)

### 🔥 Performance

- Avoid wrapping array buffer views ([c8cb54b](https://github.com/kiki-kanri/node-ciphers/commit/c8cb54b))

### 🩹 Fixes

- Normalize binary-like cipher inputs ([452c9a1](https://github.com/kiki-kanri/node-ciphers/commit/452c9a1))

### 🏡 Chore

- Update vscode settings ([7b2f6f9](https://github.com/kiki-kanri/node-ciphers/commit/7b2f6f9))
- Update eslint config ([77a5f00](https://github.com/kiki-kanri/node-ciphers/commit/77a5f00))
- Update deps, tsdown config and package scripts ([5ada952](https://github.com/kiki-kanri/node-ciphers/commit/5ada952))
- Update deps and configs ([6082b0e](https://github.com/kiki-kanri/node-ciphers/commit/6082b0e))
- Add `.gitattributes` ([4645112](https://github.com/kiki-kanri/node-ciphers/commit/4645112))
- Add `.omx/` to `.gitignore` ([a9a8cfa](https://github.com/kiki-kanri/node-ciphers/commit/a9a8cfa))
- Update scripts ([723523c](https://github.com/kiki-kanri/node-ciphers/commit/723523c))
- Upgrade deps ([2549619](https://github.com/kiki-kanri/node-ciphers/commit/2549619))

### 🤖 CI

- Update node versions ([8f4edfd](https://github.com/kiki-kanri/node-ciphers/commit/8f4edfd))

### ❤️ Contributors

- Kiki-kanri

## v6.1.4

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v6.1.3...v6.1.4)

### 🩹 Fixes

- Adjust `customExports` order in `tsdown.config` to move wildcard (`*`) exports to the end ([0b3f357](https://github.com/kiki-kanri/node-ciphers/commit/0b3f357))

### 🏡 Chore

- Update tsdown config ([59407a9](https://github.com/kiki-kanri/node-ciphers/commit/59407a9))
- Disable tsdown `fixedExtension` config ([9039405](https://github.com/kiki-kanri/node-ciphers/commit/9039405))
- Update eslint config ([e75c3d7](https://github.com/kiki-kanri/node-ciphers/commit/e75c3d7))
- Update deps ([55dcdce](https://github.com/kiki-kanri/node-ciphers/commit/55dcdce))
- Update exports config ([43cf12c](https://github.com/kiki-kanri/node-ciphers/commit/43cf12c))

### ❤️ Contributors

- Kiki-kanri

## v6.1.3

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v6.1.2...v6.1.3)

### 🩹 Fixes

- Ensure tsdown `customExports` returns after deleting keys containing internals ([7324bab](https://github.com/kiki-kanri/node-ciphers/commit/7324bab))

### 💅 Refactors

- Rename func parameters in `arr.map` and similar methods to `item` for consistency ([c5768ac](https://github.com/kiki-kanri/node-ciphers/commit/c5768ac))
- Update all import paths to use relative paths instead of `@` alias ([fa7c47c](https://github.com/kiki-kanri/node-ciphers/commit/fa7c47c))
- Tidy up code ([1a92f2c](https://github.com/kiki-kanri/node-ciphers/commit/1a92f2c))

### 📖 Documentation

- Update README ([63ba464](https://github.com/kiki-kanri/node-ciphers/commit/63ba464))

### 📦 Build

- Update tsdown config to treat all dependencies as external ([f5e4f7a](https://github.com/kiki-kanri/node-ciphers/commit/f5e4f7a))
- Update tsdown customExports to remove entries with keys containing "internals" ([59b1622](https://github.com/kiki-kanri/node-ciphers/commit/59b1622))
- Update tsdown entry ([2e67d6b](https://github.com/kiki-kanri/node-ciphers/commit/2e67d6b))
- Set tsdown external from package.json instead of using wildcard * ([7dc5f28](https://github.com/kiki-kanri/node-ciphers/commit/7dc5f28))
- Update `customExports` rules to enable IDE import hints for package usage ([e4111c0](https://github.com/kiki-kanri/node-ciphers/commit/e4111c0))
- Update `customExports` rules to enable IDE import hints for package usage ([fa88888](https://github.com/kiki-kanri/node-ciphers/commit/fa88888))

### 🏡 Chore

- Set minimum supported version to 22.12.0 ([76e8cc1](https://github.com/kiki-kanri/node-ciphers/commit/76e8cc1))
- Remove alias config ([e353604](https://github.com/kiki-kanri/node-ciphers/commit/e353604))
- Change `update-peer-dependencies-meta.ts` to non-executable permission file ([62a7690](https://github.com/kiki-kanri/node-ciphers/commit/62a7690))
- Update base tsconfig ([26f4158](https://github.com/kiki-kanri/node-ciphers/commit/26f4158))
- Add `.editorconfig` ([11056ce](https://github.com/kiki-kanri/node-ciphers/commit/11056ce))
- Upgrade devDependencies ([aca04e8](https://github.com/kiki-kanri/node-ciphers/commit/aca04e8))
- Replace `@kikiutils/changelogen` with `changelogen` ([8d1d648](https://github.com/kiki-kanri/node-ciphers/commit/8d1d648))
- Update script ([44312fb](https://github.com/kiki-kanri/node-ciphers/commit/44312fb))
- Update `pnpm.onlyBuiltDependencies` ([9788a78](https://github.com/kiki-kanri/node-ciphers/commit/9788a78))

### 🤖 CI

- Update config file ([cfba23c](https://github.com/kiki-kanri/node-ciphers/commit/cfba23c))

### ❤️ Contributors

- Kiki-kanri

## v6.1.2

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v6.1.1...v6.1.2)

### 🩹 Fixes

- Remove tsdown remove-types-js plugin and custom exports configuration ([735a3a9](https://github.com/kiki-kanri/node-ciphers/commit/735a3a9))

### 📦 Build

- Clean up js files under `dist/types` after tsdown build and update exports config ([299e647](https://github.com/kiki-kanri/node-ciphers/commit/299e647))
- Clean up js files under `dist/types` after tsdown build and update exports config ([6fa1d2b](https://github.com/kiki-kanri/node-ciphers/commit/6fa1d2b))

### ❤️ Contributors

- kiki-kanri

## v6.1.1

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v6.1.0...v6.1.1)

### 🩹 Fixes

- Remove custom exports configuration from tsdown ([efb18bc](https://github.com/kiki-kanri/node-ciphers/commit/efb18bc))
- Remove tsdown `remove-types-js` plugin ([6922c2f](https://github.com/kiki-kanri/node-ciphers/commit/6922c2f))

### ❤️ Contributors

- kiki-kanri

## v6.1.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v6.0.0...v6.1.0)

### 🚀 Enhancements

- Add `update-peer-dependencies-meta.ts` ([643c006](https://github.com/kiki-kanri/node-ciphers/commit/643c006))

### 🩹 Fixes

- Add missing -b flag to typecheck command ([cf0c795](https://github.com/kiki-kanri/node-ciphers/commit/cf0c795))

### 📦 Build

- Clean up js files under `dist/types` after tsdown build and update exports config ([2affd31](https://github.com/kiki-kanri/node-ciphers/commit/2affd31))

### 🏡 Chore

- Update all scripts ([fa5e797](https://github.com/kiki-kanri/node-ciphers/commit/fa5e797))
- Upgrade dependencies ([9ba09cb](https://github.com/kiki-kanri/node-ciphers/commit/9ba09cb))

### ❤️ Contributors

- kiki-kanri

## v6.0.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v5.0.0...v6.0.0)

### 🩹 Fixes

- Resolve alias configuration error in tsdown setup ([656e2e0](https://github.com/kiki-kanri/node-ciphers/commit/656e2e0))

### 💅 Refactors

- **tsconfig:** Separate references so src and tests use different settings ([df472e2](https://github.com/kiki-kanri/node-ciphers/commit/df472e2))
- Restructure internal files and folders and update some import paths to use `@/` alias (paths) ([c340f40](https://github.com/kiki-kanri/node-ciphers/commit/c340f40))

### 📦 Build

- ⚠️ Switch builder to tsdown and convert package to pure ESM ([d307be4](https://github.com/kiki-kanri/node-ciphers/commit/d307be4))

### 🏡 Chore

- Update `.gitignore` ([1465997](https://github.com/kiki-kanri/node-ciphers/commit/1465997))
- **ci:** Configure pnpm cache in workflow ([79e2264](https://github.com/kiki-kanri/node-ciphers/commit/79e2264))
- **ci:** Remove pnpm cache configure in workflow ([abc0801](https://github.com/kiki-kanri/node-ciphers/commit/abc0801))
- ⚠️ Drop support for Node.js 20, set minimum supported version to 22 ([3319820](https://github.com/kiki-kanri/node-ciphers/commit/3319820))
- Upgrade devDependencies ([57244a0](https://github.com/kiki-kanri/node-ciphers/commit/57244a0))
- Set tsdown alias and tsconfig paths ([be49779](https://github.com/kiki-kanri/node-ciphers/commit/be49779))
- Update tsdown config ([fc9e7cb](https://github.com/kiki-kanri/node-ciphers/commit/fc9e7cb))
- Add `tsconfig.base.json` ([f6ba6dd](https://github.com/kiki-kanri/node-ciphers/commit/f6ba6dd))
- Update eslint config ([99cd82e](https://github.com/kiki-kanri/node-ciphers/commit/99cd82e))
- Update tsdown entry ([9cbb6bb](https://github.com/kiki-kanri/node-ciphers/commit/9cbb6bb))
- Disable `isolatedDeclarations` ([85f066e](https://github.com/kiki-kanri/node-ciphers/commit/85f066e))
- Update eslint config ([09d584b](https://github.com/kiki-kanri/node-ciphers/commit/09d584b))
- Update tsdown entry config ([638745a](https://github.com/kiki-kanri/node-ciphers/commit/638745a))

### ✅ Tests

- Fix vitest config to correctly load tsconfig and aliases ([0522f79](https://github.com/kiki-kanri/node-ciphers/commit/0522f79))

#### ⚠️ Breaking Changes

- ⚠️ Switch builder to tsdown and convert package to pure ESM ([d307be4](https://github.com/kiki-kanri/node-ciphers/commit/d307be4))
- ⚠️ Drop support for Node.js 20, set minimum supported version to 22 ([3319820](https://github.com/kiki-kanri/node-ciphers/commit/3319820))

### ❤️ Contributors

- kiki-kanri

## v5.0.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v4.0.4...v5.0.0)

### 🩹 Fixes

- Resolve type errors caused by `@types/node` update ([e7be5b3](https://github.com/kiki-kanri/node-ciphers/commit/e7be5b3))
- Add missing `tslib` devDependencies ([84aee92](https://github.com/kiki-kanri/node-ciphers/commit/84aee92))

### 🏡 Chore

- Upgrade dependencies and remove `@types/node` ([32aaf31](https://github.com/kiki-kanri/node-ciphers/commit/32aaf31))
- Wrap all variable expansions in scripts with `${}` ([82c47c9](https://github.com/kiki-kanri/node-ciphers/commit/82c47c9))
- Upgrade dependencies ([a0f7a94](https://github.com/kiki-kanri/node-ciphers/commit/a0f7a94))
- Update dependencies and modify scripts ([374cc56](https://github.com/kiki-kanri/node-ciphers/commit/374cc56))
- ⚠️ Drop support for Node.js 18.12.1, set minimum supported version to 20 ([32c6ad3](https://github.com/kiki-kanri/node-ciphers/commit/32c6ad3))
- Bump tsconfig target to es2023 ([b9185b7](https://github.com/kiki-kanri/node-ciphers/commit/b9185b7))
- Lint code ([009f2c9](https://github.com/kiki-kanri/node-ciphers/commit/009f2c9))

### ✅ Tests

- Change vitest config file to mjs ([5c3bc1f](https://github.com/kiki-kanri/node-ciphers/commit/5c3bc1f))

### 🤖 CI

- Set `--prod=false` when install dependencies ([93d7945](https://github.com/kiki-kanri/node-ciphers/commit/93d7945))
- Remove `--prod=false` flag when install dependencies ([249def0](https://github.com/kiki-kanri/node-ciphers/commit/249def0))

#### ⚠️ Breaking Changes

- ⚠️ Drop support for Node.js 18.12.1, set minimum supported version to 20 ([32c6ad3](https://github.com/kiki-kanri/node-ciphers/commit/32c6ad3))

### ❤️ Contributors

- kiki-kanri

## v4.0.4

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v4.0.3...v4.0.4)

### 🏡 Chore

- Split `tsconfig` and create build-specific config for production builds ([564b6d2](https://github.com/kiki-kanri/node-ciphers/commit/564b6d2))
- **vitest:** Configure coverage to collect files only under `src/` ([e2c7f65](https://github.com/kiki-kanri/node-ciphers/commit/e2c7f65))

### ❤️ Contributors

- kiki-kanri

## v4.0.3

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v4.0.2...v4.0.3)

### 💅 Refactors

- **test:** Remove `expectErrorName`, use `toBeInstanceOf` for error assertions ([95b2fa5](https://github.com/kiki-kanri/node-ciphers/commit/95b2fa5))
- Rename `decryptedResult` to `decryptResult` ([451afaf](https://github.com/kiki-kanri/node-ciphers/commit/451afaf))

### 🏡 Chore

- **scripts:** Ensure all scripts `cd` to their current directory correctly ([5362c3b](https://github.com/kiki-kanri/node-ciphers/commit/5362c3b))
- Set `--max-warnings=0` for `lint` and `lint:fix` ([bffe476](https://github.com/kiki-kanri/node-ciphers/commit/bffe476))
- Set eslint config to enable `lib` mode ([59e03e4](https://github.com/kiki-kanri/node-ciphers/commit/59e03e4))
- Disable `ts/explicit-function-return-type` eslint rule ([5190f6b](https://github.com/kiki-kanri/node-ciphers/commit/5190f6b))
- Lint code ([f8f0974](https://github.com/kiki-kanri/node-ciphers/commit/f8f0974))
- **test:** Migrate from `jest` to `vitest` ([9a9d869](https://github.com/kiki-kanri/node-ciphers/commit/9a9d869))

### ✅ Tests

- Migrate to vitest ([619adab](https://github.com/kiki-kanri/node-ciphers/commit/619adab))

### 🤖 CI

- Update condition for uploading to Codecov in workflow job ([39851ac](https://github.com/kiki-kanri/node-ciphers/commit/39851ac))

### ❤️ Contributors

- kiki-kanri

## v4.0.2

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v4.0.1...v4.0.2)

### 💅 Refactors

- Simplify code after disabling `isolatedDeclarations` in tsconfig ([884b9fd](https://github.com/kiki-kanri/node-ciphers/commit/884b9fd))

### 📖 Documentation

- Update README badges urls ([499bc71](https://github.com/kiki-kanri/node-ciphers/commit/499bc71))
- Replace `%2F` with `/` in badge URLs in README ([4aaf916](https://github.com/kiki-kanri/node-ciphers/commit/4aaf916))

### 🏡 Chore

- Rename `jest.config.js` to `jest.config.mjs` ([76371a1](https://github.com/kiki-kanri/node-ciphers/commit/76371a1))
- Reorder lint, test, and build steps in release command ([b63dcb4](https://github.com/kiki-kanri/node-ciphers/commit/b63dcb4))
- Disable `isolatedDeclarations` in tsconfig ([ed1636f](https://github.com/kiki-kanri/node-ciphers/commit/ed1636f))
- Update `modify-files-permissions.sh` ([89f72e3](https://github.com/kiki-kanri/node-ciphers/commit/89f72e3))
- Upgrade dependencies and format code ([d5a68d6](https://github.com/kiki-kanri/node-ciphers/commit/d5a68d6))
- Add option to `upgrade-dependencies.sh` to clean `node_modules` and `pnpm-lock.yaml` before upgrading ([e542b14](https://github.com/kiki-kanri/node-ciphers/commit/e542b14))
- Upgrade dependencies ([d3ee5a7](https://github.com/kiki-kanri/node-ciphers/commit/d3ee5a7))
- Ensure all scripts change to their own directory before execution ([9be5fbf](https://github.com/kiki-kanri/node-ciphers/commit/9be5fbf))
- Update ignore files ([c81c294](https://github.com/kiki-kanri/node-ciphers/commit/c81c294))
- Upgrade dependencies ([019c6c5](https://github.com/kiki-kanri/node-ciphers/commit/019c6c5))

### ✅ Tests

- Add pass test unit ([d7b98bd](https://github.com/kiki-kanri/node-ciphers/commit/d7b98bd))

### 🤖 CI

- Add test github workflow config file ([dd421d1](https://github.com/kiki-kanri/node-ciphers/commit/dd421d1))
- Update test workflow ([1519e46](https://github.com/kiki-kanri/node-ciphers/commit/1519e46))

### ❤️ Contributors

- kiki-kanri

## v4.0.1

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v4.0.0...v4.0.1)

### 🩹 Fixes

- Correct test script command ([8d69362](https://github.com/kiki-kanri/node-ciphers/commit/8d69362))
- Add missing `typescript` devDependencies ([da950be](https://github.com/kiki-kanri/node-ciphers/commit/da950be))

### 💅 Refactors

- Remove unused constant exports ([0de2908](https://github.com/kiki-kanri/node-ciphers/commit/0de2908))

### 🏡 Chore

- Update test script in package.json ([c823ea0](https://github.com/kiki-kanri/node-ciphers/commit/c823ea0))
- Format script ([16ca049](https://github.com/kiki-kanri/node-ciphers/commit/16ca049))
- Update file permissions after installing or updating dependencies ([d141f76](https://github.com/kiki-kanri/node-ciphers/commit/d141f76))
- Add `--hideAuthorEmail` flag to bumplog command ([382091b](https://github.com/kiki-kanri/node-ciphers/commit/382091b))
- Add typecheck command to package.json scripts ([2a1f7e0](https://github.com/kiki-kanri/node-ciphers/commit/2a1f7e0))

### ❤️ Contributors

- kiki-kanri

## v4.0.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v3.0.2...v4.0.0)

### 🚀 Enhancements

- Update `Result` type to always include value field as undefined when ok is false ([a47ac8e](https://github.com/kiki-kanri/node-ciphers/commit/a47ac8e))

### 🩹 Fixes

- Correct type errors ([71948bd](https://github.com/kiki-kanri/node-ciphers/commit/71948bd))

### 💅 Refactors

- Replace `Object.freeze` with readonly type definitions for constants and variables ([a9554f2](https://github.com/kiki-kanri/node-ciphers/commit/a9554f2))
- ⚠️ Update encryption and decryption return formats ([2afad36](https://github.com/kiki-kanri/node-ciphers/commit/2afad36))
- ⚠️ Restructure project files ([1ab3aaf](https://github.com/kiki-kanri/node-ciphers/commit/1ab3aaf))

### 📖 Documentation

- Update README, package description and keywords ([d9fa4b7](https://github.com/kiki-kanri/node-ciphers/commit/d9fa4b7))
- Update CHANGELOG ([7ecd21d](https://github.com/kiki-kanri/node-ciphers/commit/7ecd21d))

### 🏡 Chore

- Upgrade dependencies ([1c9245c](https://github.com/kiki-kanri/node-ciphers/commit/1c9245c))
- Enable `isolatedDeclarations` in tsconfig and update code ([7c8842e](https://github.com/kiki-kanri/node-ciphers/commit/7c8842e))
- Upgrade dependencies ([57bd00f](https://github.com/kiki-kanri/node-ciphers/commit/57bd00f))
- Lint code ([95cfafb](https://github.com/kiki-kanri/node-ciphers/commit/95cfafb))
- Run tsc for type checking before executing tests ([1caa387](https://github.com/kiki-kanri/node-ciphers/commit/1caa387))

### ✅ Tests

- Add tests for invalid key length and invalid mode cases ([56c4b2b](https://github.com/kiki-kanri/node-ciphers/commit/56c4b2b))
- Update jest and tsconfig.jest configs ([96002dd](https://github.com/kiki-kanri/node-ciphers/commit/96002dd))
- Improve tests for custom Cipher interface ([63a00dd](https://github.com/kiki-kanri/node-ciphers/commit/63a00dd))

#### ⚠️ Breaking Changes

- ⚠️ Update encryption and decryption return formats ([2afad36](https://github.com/kiki-kanri/node-ciphers/commit/2afad36))
- ⚠️ Restructure project files ([1ab3aaf](https://github.com/kiki-kanri/node-ciphers/commit/1ab3aaf))

### ❤️ Contributors

- kiki-kanri

## v3.0.2

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v3.0.1...v3.0.2)

### 🏡 Chore

- Set `sideEffects` to false in package.json ([a717ca6](https://github.com/kiki-kanri/node-ciphers/commit/a717ca6))

### ❤️ Contributors

- kiki-kanri

## v3.0.1

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v3.0.0...v3.0.1)

### 💅 Refactors

- Remove all internal default export ([32ad7e5](https://github.com/kiki-kanri/node-ciphers/commit/32ad7e5))

### 🏡 Chore

- Update CHANGELOG ([cb9de4e](https://github.com/kiki-kanri/node-ciphers/commit/cb9de4e))
- Set `hideAuthorEmail` arg in changelogen command ([155db59](https://github.com/kiki-kanri/node-ciphers/commit/155db59))
- Upgrade dependencies ([cf5ed01](https://github.com/kiki-kanri/node-ciphers/commit/cf5ed01))

### ❤️ Contributors

- kiki-kanri

## v3.0.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v2.0.2...v3.0.0)

### 💅 Refactors

- ⚠️ Update imports and exports ([221fcbc](https://github.com/kiki-kanri/node-ciphers/commit/221fcbc))

### 📖 Documentation

- Update README ([4f7db6f](https://github.com/kiki-kanri/node-ciphers/commit/4f7db6f))

### 🏡 Chore

- Upgrade dependencies ([d7ec80c](https://github.com/kiki-kanri/node-ciphers/commit/d7ec80c))
- Change `utf8` to `utf-8` ([d851092](https://github.com/kiki-kanri/node-ciphers/commit/d851092))
- Format code ([6fb2e19](https://github.com/kiki-kanri/node-ciphers/commit/6fb2e19))
- Upgrade dependencies ([1ab04a3](https://github.com/kiki-kanri/node-ciphers/commit/1ab04a3))
- Upgrade dependencies ([0eb4917](https://github.com/kiki-kanri/node-ciphers/commit/0eb4917))

### ✅ Tests

- Add unit test for custom auth tag length in AES encryption/decryption methods ([7872f0b](https://github.com/kiki-kanri/node-ciphers/commit/7872f0b))
- Update test units ([593429b](https://github.com/kiki-kanri/node-ciphers/commit/593429b))

#### ⚠️ Breaking Changes

- ⚠️ Update imports and exports ([221fcbc](https://github.com/kiki-kanri/node-ciphers/commit/221fcbc))

### ❤️ Contributors

- kiki-kanri

## v2.0.2

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v2.0.1...v2.0.2)

### 🏡 Chore

- Upgrade dependencies ([feac3b5](https://github.com/kiki-kanri/node-ciphers/commit/feac3b5))
- Format and lint codes ([e412186](https://github.com/kiki-kanri/node-ciphers/commit/e412186))

### ❤️ Contributors

- kiki-kanri

## v2.0.1

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v2.0.0...v2.0.1)

### 🩹 Fixes

- Correct incorrect `LICENSE` link in README ([e8df54d](https://github.com/kiki-kanri/node-ciphers/commit/e8df54d))

### 🏡 Chore

- Upgrade dependencies ([0ab7c9a](https://github.com/kiki-kanri/node-ciphers/commit/0ab7c9a))

### ❤️ Contributors

- kiki-kanri

## v2.0.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v1.1.7...v2.0.0)

### 💅 Refactors

- ⚠️ Enforce camelCase naming for all variables, classes, methods, types, etc., ignoring abbreviations ([5353c5e](https://github.com/kiki-kanri/node-ciphers/commit/5353c5e))

### 🏡 Chore

- Upgrade dependencies and add `pnpm.onlyBuiltDependencies` setting to package.json ([dab63ad](https://github.com/kiki-kanri/node-ciphers/commit/dab63ad))

#### ⚠️ Breaking Changes

- ⚠️ Enforce camelCase naming for all variables, classes, methods, types, etc., ignoring abbreviations ([5353c5e](https://github.com/kiki-kanri/node-ciphers/commit/5353c5e))

### ❤️ Contributors

- kiki-kanri

## v1.1.7

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v1.1.6...v1.1.7)

### 📦 Build

- Enable sourcemap output in build process ([b5c29ce](https://github.com/kiki-kanri/node-ciphers/commit/b5c29ce))

### 🏡 Chore

- Upgrade dependencies ([9dcabe1](https://github.com/kiki-kanri/node-ciphers/commit/9dcabe1))
- Upgrade dependencies ([aba3c7d](https://github.com/kiki-kanri/node-ciphers/commit/aba3c7d))
- Include src folder in the package published to npm ([fb0c541](https://github.com/kiki-kanri/node-ciphers/commit/fb0c541))

### 🎨 Styles

- Format and lint all files ([5a95a50](https://github.com/kiki-kanri/node-ciphers/commit/5a95a50))
- Format code block in README ([521e99f](https://github.com/kiki-kanri/node-ciphers/commit/521e99f))

### ❤️ Contributors

- kiki-kanri

## v1.1.6

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v1.1.5...v1.1.6)

### 🏡 Chore

- Upgrade dependencies ([b6b2263](https://github.com/kiki-kanri/node-ciphers/commit/b6b2263))
- Modify `eslint-disable-next-line` comment style ([dd03fe4](https://github.com/kiki-kanri/node-ciphers/commit/dd03fe4))
- Upgrade dependencies ([ee9c5c3](https://github.com/kiki-kanri/node-ciphers/commit/ee9c5c3))
- Upgrade dependencies ([2ab5718](https://github.com/kiki-kanri/node-ciphers/commit/2ab5718))

### 🎨 Styles

- Format codes ([b478fa1](https://github.com/kiki-kanri/node-ciphers/commit/b478fa1))
- Change all indentation to 4 spaces ([c459250](https://github.com/kiki-kanri/node-ciphers/commit/c459250))
- Format and lint files ([484d32d](https://github.com/kiki-kanri/node-ciphers/commit/484d32d))

### ❤️ Contributors

- kiki-kanri

## v1.1.5

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v1.1.4...v1.1.5)

### 💅 Refactors

- Replace `Omit` type with type-fest's `Except` type ([c327c4d](https://github.com/kiki-kanri/node-ciphers/commit/c327c4d))

### 🏡 Chore

- Modify release script in package.json ([9dd2ae8](https://github.com/kiki-kanri/node-ciphers/commit/9dd2ae8))
- Upgrade dependencies ([eba4320](https://github.com/kiki-kanri/node-ciphers/commit/eba4320))
- Replace Prettier with ESLint, add related files, and update VSCode settings ([85b7c74](https://github.com/kiki-kanri/node-ciphers/commit/85b7c74))
- Modify scripts in package.json ([9109e30](https://github.com/kiki-kanri/node-ciphers/commit/9109e30))

### 🎨 Styles

- Format and lint all files ([6fd68f5](https://github.com/kiki-kanri/node-ciphers/commit/6fd68f5))

### ❤️ Contributors

- kiki-kanri

## v1.1.4

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v1.1.3...v1.1.4)

### 💅 Refactors

- Change certain class properties to readonly ([bdf9292](https://github.com/kiki-kanri/node-ciphers/commit/bdf9292))
- Replace `@ts-ignore` with `@ts-expect-error` ([f154b2d](https://github.com/kiki-kanri/node-ciphers/commit/f154b2d))

### 📖 Documentation

- Update README ([c59ca76](https://github.com/kiki-kanri/node-ciphers/commit/c59ca76))

### 🏡 Chore

- Update test CI configuration file ([a0ee706](https://github.com/kiki-kanri/node-ciphers/commit/a0ee706))
- Upgrade dependencies ([15e2774](https://github.com/kiki-kanri/node-ciphers/commit/15e2774))
- Remove consola dependency ([9706fb7](https://github.com/kiki-kanri/node-ciphers/commit/9706fb7))
- Upgrade dependencies ([9912b43](https://github.com/kiki-kanri/node-ciphers/commit/9912b43))

### ✅ Tests

- Use cross-env for setting env in test script ([0aa6c86](https://github.com/kiki-kanri/node-ciphers/commit/0aa6c86))
- Change some test keys to use buffer ([065b13f](https://github.com/kiki-kanri/node-ciphers/commit/065b13f))

### 🤖 CI

- Allow manual triggering of test CI ([1a470fb](https://github.com/kiki-kanri/node-ciphers/commit/1a470fb))
- Update node version list in CI file ([ad70a6f](https://github.com/kiki-kanri/node-ciphers/commit/ad70a6f))

### ❤️ Contributors

- kiki-kanri

## v1.1.3

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v1.1.2...v1.1.3)

### 📖 Documentation

- Add codecov badge to README ([e7db65b](https://github.com/kiki-kanri/node-ciphers/commit/e7db65b))

### 🏡 Chore

- **ci:** Add test.yaml for version-tag-based CI trigger ([88e04ae](https://github.com/kiki-kanri/node-ciphers/commit/88e04ae))

### ❤️ Contributors

- kiki-kanri

## v1.1.2

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v1.1.1...v1.1.2)

### 🩹 Fixes

- Resolve import errors with ES modules ([ea87241](https://github.com/kiki-kanri/node-ciphers/commit/ea87241))

### 💅 Refactors

- **cipher:** Set `BaseCipher.#encodingOptions` to readonly ([1e2d2e1](https://github.com/kiki-kanri/node-ciphers/commit/1e2d2e1))
- **constants:** Change constant type definition method ([b44da60](https://github.com/kiki-kanri/node-ciphers/commit/b44da60))

### 🏡 Chore

- Modify tsconfig.json ([21172f7](https://github.com/kiki-kanri/node-ciphers/commit/21172f7))
- Upgrade dependencies and modify release script ([4463e13](https://github.com/kiki-kanri/node-ciphers/commit/4463e13))

### ❤️ Contributors

- kiki-kanri

## v1.1.1

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v1.1.0...v1.1.1)

### 🩹 Fixes

- Add missing types field in package.json ([3cf4d8c](https://github.com/kiki-kanri/node-ciphers/commit/3cf4d8c))

### 🏡 Chore

- Upgrade dependencies ([1c739af](https://github.com/kiki-kanri/node-ciphers/commit/1c739af))

### ❤️ Contributors

- kiki-kanri

## v1.1.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v1.0.2...v1.1.0)

### 🚀 Enhancements

- Add release script to package.json ([b37a70f](https://github.com/kiki-kanri/node-ciphers/commit/b37a70f))

### 🏡 Chore

- Upgrade dependencies ([340aec2](https://github.com/kiki-kanri/node-ciphers/commit/340aec2))
- Switch changelog generation package ([d2234f6](https://github.com/kiki-kanri/node-ciphers/commit/d2234f6))
- Remove main, module, and types fields from package.json and add exports configuration ([8f32911](https://github.com/kiki-kanri/node-ciphers/commit/8f32911))

### ✅ Tests

- Update test cases ([8865b3c](https://github.com/kiki-kanri/node-ciphers/commit/8865b3c))

### ❤️ Contributors

- kiki-kanri

## v1.0.2

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v1.0.1...v1.0.2)

### 🏡 Chore

- Remove tsx dependency ([b2a1679](https://github.com/kiki-kanri/node-ciphers/commit/b2a1679))
- Update keywords in package.json ([e69cd41](https://github.com/kiki-kanri/node-ciphers/commit/e69cd41))

### ❤️ Contributors

- kiki-kanri

## v1.0.1

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v1.0.0...v1.0.1)

### 🩹 Fixes

- Correct usage error of JSON data decryption in README example ([67d7465](https://github.com/kiki-kanri/node-ciphers/commit/67d7465))

### 🏡 Chore

- Add Jest dependencies and configuration files ([7a3793c](https://github.com/kiki-kanri/node-ciphers/commit/7a3793c))

### ✅ Tests

- Rewrite tests using Jest ([24f2027](https://github.com/kiki-kanri/node-ciphers/commit/24f2027))

### ❤️ Contributors

- kiki-kanri

## v1.0.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v1.0.0-rc.0...v1.0.0)

### 💅 Refactors

- Freeze constants using Object.freeze ([07b2932](https://github.com/kiki-kanri/node-ciphers/commit/07b2932))

### 📖 Documentation

- Update package.json and README ([f0233ac](https://github.com/kiki-kanri/node-ciphers/commit/f0233ac))

### 🏡 Chore

- Upgrade dependencies ([a706e4e](https://github.com/kiki-kanri/node-ciphers/commit/a706e4e))

### ❤️ Contributors

- kiki-kanri

## v1.0.0-rc.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v0.8.1...v1.0.0-rc.0)

### 🚀 Enhancements

- Add `dataToBuffer` method to `BaseCipher` class and update `getCipherResult` and `getDecipherResult` ([feec52b](https://github.com/kiki-kanri/node-ciphers/commit/feec52b))

### 💅 Refactors

- Change all @/ imports to relative paths ([8c8f304](https://github.com/kiki-kanri/node-ciphers/commit/8c8f304))
- Rename selected files ([d33994a](https://github.com/kiki-kanri/node-ciphers/commit/d33994a))
- Rename test folder to tests ([9102ac8](https://github.com/kiki-kanri/node-ciphers/commit/9102ac8))
- Update type export method ([c2563a6](https://github.com/kiki-kanri/node-ciphers/commit/c2563a6))
- Freeze constants using Object.freeze ([d644ed7](https://github.com/kiki-kanri/node-ciphers/commit/d644ed7))
- Replace ternary expressions with `dataToBuffer` for data conversion to buffer ([7fda460](https://github.com/kiki-kanri/node-ciphers/commit/7fda460))

### 📦 Build

- Update build process and tsconfig ([b4270af](https://github.com/kiki-kanri/node-ciphers/commit/b4270af))

### 🏡 Chore

- Upgrade dependencies ([4fc1ea7](https://github.com/kiki-kanri/node-ciphers/commit/4fc1ea7))
- Update .gitignore ([75bbfcf](https://github.com/kiki-kanri/node-ciphers/commit/75bbfcf))
- Upgrade dependencies ([c89c3e9](https://github.com/kiki-kanri/node-ciphers/commit/c89c3e9))
- Upgrade dependencies ([99825ac](https://github.com/kiki-kanri/node-ciphers/commit/99825ac))
- Update package.json ([f613821](https://github.com/kiki-kanri/node-ciphers/commit/f613821))
- Remove playground ([879ae28](https://github.com/kiki-kanri/node-ciphers/commit/879ae28))
- Add bumplog script ([339745c](https://github.com/kiki-kanri/node-ciphers/commit/339745c))

### ✅ Tests

- Update error messages ([321b208](https://github.com/kiki-kanri/node-ciphers/commit/321b208))

### 🎨 Styles

- Reorder imports ([efcf39f](https://github.com/kiki-kanri/node-ciphers/commit/efcf39f))

### ❤️ Contributors

- kiki-kanri

## v0.8.1

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v0.8.0...v0.8.1)

### 💅 Refactors

- Modify import type method and structure ([d3179e3](https://github.com/kiki-kanri/node-ciphers/commit/d3179e3))

### 🏡 Chore

- Upgrade dependencies ([30bb321](https://github.com/kiki-kanri/node-ciphers/commit/30bb321))

### ❤️ Contributors

- kiki-kanri

## v0.8.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v0.7.0...v0.8.0)

### 🚀 Enhancements

- Add base cipher class and refactor repeated code into it ([326615e](https://github.com/kiki-kanri/node-ciphers/commit/326615e))
- Add export of types ([f5590fc](https://github.com/kiki-kanri/node-ciphers/commit/f5590fc))

### 💅 Refactors

- Move duplicate code to base cipher class ([01219eb](https://github.com/kiki-kanri/node-ciphers/commit/01219eb))

### ❤️ Contributors

- kiki-kanri

## v0.7.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v0.6.0...v0.7.0)

### 🚀 Enhancements

- Add methods for encrypting and decrypting JSON data ([2744eb1](https://github.com/kiki-kanri/node-ciphers/commit/2744eb1))

### 💅 Refactors

- Rename 'tests' folder to 'test' ([ee32ad0](https://github.com/kiki-kanri/node-ciphers/commit/ee32ad0))

### 📖 Documentation

- Update README ([b79f824](https://github.com/kiki-kanri/node-ciphers/commit/b79f824))
- Update keywords list in package.json ([1c2569a](https://github.com/kiki-kanri/node-ciphers/commit/1c2569a))

### 🏡 Chore

- Upgrade dependencies ([2e70b3f](https://github.com/kiki-kanri/node-ciphers/commit/2e70b3f))

### ✅ Tests

- Add tests for JSON encryption and decryption ([b199ee9](https://github.com/kiki-kanri/node-ciphers/commit/b199ee9))

### ❤️ Contributors

- kiki-kanri

## v0.6.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v0.5.0...v0.6.0)

### 🚀 Enhancements

- Add initial files for playground setup ([09d64e3](https://github.com/kiki-kanri/node-ciphers/commit/09d64e3))
- Add support for DES-EDE and DES-EDE3 modes ([298f724](https://github.com/kiki-kanri/node-ciphers/commit/298f724))

### 🩹 Fixes

- Resolve issue where IV is mandatory in ECB mode ([99f4428](https://github.com/kiki-kanri/node-ciphers/commit/99f4428))

### 📖 Documentation

- Update CHANGELOG with recent changes and fixes ([4d1ec15](https://github.com/kiki-kanri/node-ciphers/commit/4d1ec15))

### 🏡 Chore

- Upgrade dependencies ([6fe4f8c](https://github.com/kiki-kanri/node-ciphers/commit/6fe4f8c))

### ✅ Tests

- Update DES test cases for enhanced coverage and reliability ([4ea19ed](https://github.com/kiki-kanri/node-ciphers/commit/4ea19ed))

### ❤️ Contributors

- kiki-kanri

## v0.5.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v0.4.0...v0.5.0)

### 🚀 Enhancements

- Add des base classes and types ([6bf7454](https://github.com/kiki-kanri/node-ciphers/commit/6bf7454))
- Add des cbc, cfb, cfb1, cfb8, ecb, ofb ciphers ([5e35238](https://github.com/kiki-kanri/node-ciphers/commit/5e35238))
- Add des tests and update data in aes tests ([3e3e2e6](https://github.com/kiki-kanri/node-ciphers/commit/3e3e2e6))
- Implement export functionality for DES ciphers ([7f3b203](https://github.com/kiki-kanri/node-ciphers/commit/7f3b203))

### 🩹 Fixes

- Correct encodingOptions type for aes ccm and gcm encryption/decryption ([fd8dd27](https://github.com/kiki-kanri/node-ciphers/commit/fd8dd27))

### 💅 Refactors

- Simplify test code ([60b2eb5](https://github.com/kiki-kanri/node-ciphers/commit/60b2eb5))
- Split options interface into smaller interfaces ([ea6027c](https://github.com/kiki-kanri/node-ciphers/commit/ea6027c))
- Consolidate constants into a single file ([7f540ca](https://github.com/kiki-kanri/node-ciphers/commit/7f540ca))

### 📖 Documentation

- Update keywords list in package.json ([7150a78](https://github.com/kiki-kanri/node-ciphers/commit/7150a78))

### 🏡 Chore

- Upgrade dependencies ([855fe04](https://github.com/kiki-kanri/node-ciphers/commit/855fe04))
- Upgrade dependencies ([95d76a4](https://github.com/kiki-kanri/node-ciphers/commit/95d76a4))

### ❤️ Contributors

- kiki-kanri

## v0.4.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v0.3.0...v0.4.0)

### 🚀 Enhancements

- Change authTag, data, key, and iv to allow BinaryLike type ([e7bb3db](https://github.com/kiki-kanri/node-ciphers/commit/e7bb3db))

### 💅 Refactors

- Split base class and simplify ciphers implementations ([e2d89a5](https://github.com/kiki-kanri/node-ciphers/commit/e2d89a5))
- Update import syntax ([e568e32](https://github.com/kiki-kanri/node-ciphers/commit/e568e32))
- Rename catch clause variable from _ to error ([be1ef4f](https://github.com/kiki-kanri/node-ciphers/commit/be1ef4f))
- Streamline aes ecb decryption code ([0a148fd](https://github.com/kiki-kanri/node-ciphers/commit/0a148fd))
- Simplify type names ([4aad310](https://github.com/kiki-kanri/node-ciphers/commit/4aad310))
- Rename test functions ([345848d](https://github.com/kiki-kanri/node-ciphers/commit/345848d))
- Relocate tests directory and update code ([f8d42b5](https://github.com/kiki-kanri/node-ciphers/commit/f8d42b5))
- Update error messages in tests ([6b483c0](https://github.com/kiki-kanri/node-ciphers/commit/6b483c0))
- Remove reassignment of 'data' variable ([df385f6](https://github.com/kiki-kanri/node-ciphers/commit/df385f6))

### ❤️ Contributors

- kiki-kanri

## v0.3.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v0.2.0...v0.3.0)

### 🚀 Enhancements

- Add author and keywords to package.json ([7b89178](https://github.com/kiki-kanri/node-ciphers/commit/7b89178))
- Allow passing cipher options in encrypt and decrypt methods ([388c2ea](https://github.com/kiki-kanri/node-ciphers/commit/388c2ea))
- Add aes ccm and gcm ciphers and types ([3543a13](https://github.com/kiki-kanri/node-ciphers/commit/3543a13))
- Add aes ciphers test functions ([1c4d4be](https://github.com/kiki-kanri/node-ciphers/commit/1c4d4be))
- Add aes ofb cipher ([1ee6f9e](https://github.com/kiki-kanri/node-ciphers/commit/1ee6f9e))

### 💅 Refactors

- Remove conversion assignment of data in encryption process ([f1b6e5c](https://github.com/kiki-kanri/node-ciphers/commit/f1b6e5c))
- Remove null type from iv parameter in decrypt method ([13c1885](https://github.com/kiki-kanri/node-ciphers/commit/13c1885))
- Restructure test code ([e274b0d](https://github.com/kiki-kanri/node-ciphers/commit/e274b0d))

### 📖 Documentation

- Update keywords list in package.json ([54bce09](https://github.com/kiki-kanri/node-ciphers/commit/54bce09))

### ❤️ Contributors

- kiki-kanri

## v0.2.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/v0.1.0...v0.2.0)

### 🚀 Enhancements

- Add base aes cipher class and types ([748d595](https://github.com/kiki-kanri/node-ciphers/commit/748d595))
- Add algorithm getter to BaseAESCipher class ([d996f11](https://github.com/kiki-kanri/node-ciphers/commit/d996f11))
- Add aes cbc, cfb, cfb1, cfb8 and ctr ciphers ([d07da79](https://github.com/kiki-kanri/node-ciphers/commit/d07da79))
- Set index export aes ciphers ([1d4b1c8](https://github.com/kiki-kanri/node-ciphers/commit/1d4b1c8))
- Add consola package ([f61b2fa](https://github.com/kiki-kanri/node-ciphers/commit/f61b2fa))
- Add ecb cipher ([ef66e0d](https://github.com/kiki-kanri/node-ciphers/commit/ef66e0d))

### 💅 Refactors

- Remove bun files and use tsx to run dev ([ca42704](https://github.com/kiki-kanri/node-ciphers/commit/ca42704))
- Rename AvailableAESMode to AvailableAESCipherMode ([c8ffb2b](https://github.com/kiki-kanri/node-ciphers/commit/c8ffb2b))
- Move check key and get algorithm into constructor block ([cbd5696](https://github.com/kiki-kanri/node-ciphers/commit/cbd5696))

### 🏡 Chore

- Add node types ([5f41b4b](https://github.com/kiki-kanri/node-ciphers/commit/5f41b4b))
- Set engines and type in package.json ([778405f](https://github.com/kiki-kanri/node-ciphers/commit/778405f))
- Add build tool and script ([0abfc9b](https://github.com/kiki-kanri/node-ciphers/commit/0abfc9b))
- Upgrade dependencies ([34de2ac](https://github.com/kiki-kanri/node-ciphers/commit/34de2ac))

### ❤️ Contributors

- kiki-kanri

## v0.1.0

[compare changes](https://github.com/kiki-kanri/node-ciphers/compare/7b3027e...v0.1.0)

### 📖 Documentation

- Add readme ([d119e9f](https://github.com/kiki-kanri/node-ciphers/commit/d119e9f))

### 🏡 Chore

- Add base files ([ab1d42c](https://github.com/kiki-kanri/node-ciphers/commit/ab1d42c))

### ❤️ Contributors

- kiki-kanri
