// needed given our Webpack configuration uses ES6 and JSX

// Reference: http://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = function karmaConfig (config) {
  config.set({
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-spec-reporter'
    ],

    frameworks: [
      // Reference: https://github.com/karma-runner/karma-mocha
      // Set framework to mocha
      'mocha'
    ],

    reporters: [
      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      'spec'
    ],

    files: [
      // Grab all files in the tests directory that contain _test.
      'test/**/*.spec.js'
    ],

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'test/**/*.spec.js': ['webpack', 'sourcemap']
    },

    browsers: [
      // 'Firefox',
      // 'Chrome',
      'ChromeHeadless'
    ],

    singleRun: true,

    client: {
      mocha: {
        reporter: 'html' // change Karma's debug.html to the mocha web reporter
      }
    },

    // Test webpack config
    webpack: require('./webpack.config'),

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: true
    }
  })
}
