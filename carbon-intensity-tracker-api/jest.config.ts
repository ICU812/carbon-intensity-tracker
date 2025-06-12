import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.test.json'
      }
    ]
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/']
};

export default config;
