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
    '@typings/(.*)': '<rootDir>/src/typings/$1',
    '@dtos/(.*)': '<rootDir>/src/dtos/$1',
    '@db/(.*)': '<rootDir>/src/db/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
  }
};