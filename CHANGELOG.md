# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2026-03-13

### Added

- Add `Result<T, E>` and `AsyncResult<T, E>` utility types for better TypeScript experience
- Add GitHub Actions CI/CD with multi-version Node.js testing
- Add size-limit checks for package size monitoring
- Add typecheck script for TypeScript validation
- Add `.editorconfig` for consistent editor configuration
- Add `.npmignore` to ensure clean package publishing
- Add comprehensive test suite with 100% code coverage

### Changed

- **Breaking**: Remove `tslib` runtime dependency - now zero dependencies
- Migrate from Jest to Vitest for faster testing
- Upgrade ESLint to v10 with flat config format
- Upgrade TypeScript to v5.9
- Upgrade Rollup to v4.59
- Upgrade all other dependencies to latest versions
- Simplify build configuration
- Optimize TypeScript configuration (remove unnecessary decorator options)
- Improve package.json exports configuration

### Removed

- Remove `tslib` dependency
- Remove `core-js` dependency
- Remove `coveralls` and `cross-env` (no longer needed)
- Remove legacy rollup plugins (`rollup-plugin-filesize`, `rollup-plugin-visualizer`)

## [1.1.1] - 2024-05-30

### Changed

- Documentation improvements
- Switch to pnpm v9

## [1.1.0] - 2024-05-30

### Fixed

- Type definitions

### Changed

- Upgrade all packages

## [1.0.2] - 2023-11-13

### Changed

- Code optimization

## [1.0.1] - 2023-11-03

### Changed

- Rename function to `awaitToDone`

## [1.0.0] - 2023-11-03

### Added

- Initial release
- Basic `awaitToDone` function for async error handling
- Support for single promise, multiple promises, and array of promises
