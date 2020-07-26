'use strict';
const path = require('path');
const defaultSettings = require('./src/settings.js');

function resolve (dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title; // page title
const port = 8090; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  transpileDependencies: [
    /canknow-ui-core/,
    /canknow-icon/,
    /canknow-core/
  ],
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        // target: 'http://47.92.68.38:8000/',
        target: 'http://slqh.cnqos.com/',
        changeOrigin: true,
        //原始为 '^/api': '', 后续发布时看需不需要改回
        pathRewrite: {
          '^/api': 'api'
        }
      },
      '/upload': {
        // target: 'http://47.92.68.38:8000/',
        target: 'http://slqh.cnqos.com/',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    externals: {
      // 'Vue': 'Vue',
      // 'vue': 'Vue',
      // 'vuex': 'Vuex',
      // 'vue-router': 'VueRouter',
      // 'axios': 'axios',
      'moment': 'moment'
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack (config) {
    config.plugins.delete('preload'); // TODO: need test
    config.plugins.delete('prefetch'); // TODO: need test
  }
};
