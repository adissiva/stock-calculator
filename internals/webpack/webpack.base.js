/**
 * Common Webpack configuration used by all other configs
 */
const path = require('path');
const webpack = require('webpack');
module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: process.env.APP_CONTEXT || '/',
    },
    options.output,
  ),
  optimization: options.optimization || {},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'production',
      SERVER_ENV: process.env.SERVER_ENV,
      APP_CONTEXT: process.env.APP_CONTEXT,
      SERVICE_CONTEXT: process.env.SERVICE_CONTEXT,
    }),
  ]),
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    mainFields: ['browser', 'jsnext:main', 'main'],
    alias: {
      httpconstants$: path.resolve(
        process.cwd(),
        `app/common/services/http/constants.${process.env.SERVER_ENV}.js`,
      ),
    },
    modules: ['node_modules', 'app'],
  },
  devtool: options.devtool,
  target: 'web',
  performance: options.performance || {},
});
