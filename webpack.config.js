const path = require('path')

const ROOT_PATH = path.resolve(__dirname)

module.exports = {
  mode: 'development',
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: [
          path.resolve(ROOT_PATH, 'src'),
          path.resolve(ROOT_PATH, 'test')
        ]
      }
    ]
  }
}
