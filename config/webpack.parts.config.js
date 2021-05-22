const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin')

exports.cleanup = () => ({
  plugins: [
    new CleanWebpackPlugin({ verbose: false }),
  ],
})

exports.loadJs = ({ options }) => ({
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: ['/node_modules/', '/lib/'],
        use: [
          {
            loader: 'ts-loader',
            options: options,
          },
        ],
      },
    ],
  },
})

exports.sourceMaps = method => ({
  devtool: method,
})

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
})
