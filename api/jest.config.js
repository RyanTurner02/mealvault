/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: {
    '@model/(.*)': '<rootDir>/src/model/$1',
    '@controller/(.*)': '<rootDir>/src/controller/$1',
    '@service/(.*)': '<rootDir>/src/service/$1',
    '@repository/(.*)': '<rootDir>/src/repository/$1',
    '@middleware/(.*)': '<rootDir>/src/middleware/$1',
  }
};