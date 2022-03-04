/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['./test/fixtures', './test/loadApplication.test.ts'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
