import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.(s?css|svg)$": "<rootDir>/src/web/__mocks__/assetMock.ts",
  },
  collectCoverage: true,
  coverageReporters: ["text", "json-summary"],
};

export default config;
