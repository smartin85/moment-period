var package = require('./package.json');

module.exports = function (config) {
  const testTarget = `moment-period${process.env.MINIFIED_TESTS ? '.min' : ''}.js`;
  console.log(`Testing ${testTarget} ...`);
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/moment/moment.js',
      testTarget,
      'tests/moment-period.spec.js',
      'tests/*.spec.js',
    ],
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-global-preprocessor'
    ],
    globals: {
      packageVersion: package.version
    },
    preprocessors: {
      'tests/moment-period.spec.js': ['global']
    },
    singleRun: false
  });
};