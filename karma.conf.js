module.exports = function(config) {
  config.set({
    browsers: ['Chrome', 'Firefox'],
    files: [
      'tests/*.spec.js'
    ],
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      'tests/*.spec.js': ['webpack', 'sourcemap'],
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    reporters: ['dots'],
    singleRun: false,
    webpack: {
      module: {
        loaders: [
          { test: /\.spec\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};