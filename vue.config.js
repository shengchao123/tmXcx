'use strict'
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@c': resolve('src/components'),
        '@u': resolve('src/utils')
      }
    },
    plugins: [
      // new BundleAnalyzerPlugin()
    ]
  }
}
