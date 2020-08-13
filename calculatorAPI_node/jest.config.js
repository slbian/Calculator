module.exports = {
  verbose: true,
  clearMocks: true,
  restoreMocks: true,
  collectCoverage: true,
  moduleNameMapper: {
    '.(scss)$': '/config/module-mock.js',
  },
  transform: {
    '^.+\\.js': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
};
