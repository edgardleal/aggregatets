/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.ts',
    'index.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!dist/**',
  ],
  reporters: ['default', 'github-actions'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
  testEnvironment: 'node',
};
