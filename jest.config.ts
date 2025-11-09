import type { Config } from 'jest';

const config: Config = {
  extensionsToTreatAsEsm: ['.ts', '.mts'],
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'mts', 'js', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).mts'],
  transform: {
    '^.+\\.(ts|mts)$': ['ts-jest', { useESM: true }],
  },
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  verbose: true,
};

export default config;
