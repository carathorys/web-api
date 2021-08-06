/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>/packages/utils',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx,js,jsx}', '!**/node_modules/**', '!**/index.js'],
  coverageReporters: ['text', 'json', 'html', 'cobertura'],
  reporters: ['default', 'jest-junit']
};