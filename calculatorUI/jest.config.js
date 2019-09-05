export default {
  verbose: true,
  clearMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['/config/enzyme-setup.js'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**', '!**/vendor/**'],
  testMatch: ['/tests/?(*.)(spec|test).js'],
  moduleNameMapper: {
    '.(scss)$': '/config/module-mock.js'
  },
  snapshotSerializers: ['enzyme-to-json/serializer']
};
