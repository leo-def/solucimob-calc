module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
    '^.+\\.ts$': 'ts-jest'
  },
  testRegex: '\\.(test|spec)\\.ts',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
}

