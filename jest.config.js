/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
const nextJest = require("next/jest");

/** @type {import("jest").Config} */
const createJestConfig = nextJest({
  dir: "./",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  setupFiles: [
    "jest-localstorage-mock",
    "<rootDir>/mocks/xmlhttprequest.js",
  ],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    // Handle module aliases (if you"re using them in your next.config.js)
    "^@app/(.*)$": "<rootDir>/app/$1",
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@layouts/(.*)$": "<rootDir>/layouts/$1",
  },
  testEnvironment: "jsdom",
});

const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom"
};

module.exports = createJestConfig(config);