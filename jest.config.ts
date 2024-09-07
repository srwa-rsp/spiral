import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest/presets/default-esm", 
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", 
  },
  testEnvironment: 'jsdom', 
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true, 
      },
    ],
  },
  setupFilesAfterEnv: ["./jest-extended-matchers.ts"], 
};

export default jestConfig;
