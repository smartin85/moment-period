module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/moment/moment.js',
      'moment-period.js',
      'tests/moment-period.spec.js',
      'tests/*.spec.js',
    ],
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-global-preprocessor'
    ],
    globals: {
      packageVersion: require('./package.json').version
    },
    preprocessors: {
      'tests/moment-period.spec.js': ['global']
    },
    singleRun: false
  });
};