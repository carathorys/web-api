/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
import type { Config } from "@jest/types";

import { pathsToModuleNameMapper } from "ts-jest/utils";
// Load the config which holds the path aliases.
import { compilerOptions } from "./tsconfig.json";

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    // This has to match the baseUrl defined in tsconfig.json.
    prefix: "<rootDir>",
  }),
  
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!**/index.ts', '!**/*.config.ts', '!**/*.enum.ts', '!**/*.model.ts'],
  coverageReporters: ['text', 'json', 'html', 'cobertura'],
  reporters: ['default', 'jest-junit'],

}


export default config;