module.exports = function(config) {
  config.set({
    browsers: ['Firefox'],
    files: [
      'tests/*.spec.js'
    ],
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      'lib/*.js': ['webpack', 'sourcemap'],
      'tests/*.spec.js': ['webpack', 'sourcemap']
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
    singleRun: true,
    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime' },
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};