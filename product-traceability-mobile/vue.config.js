'use strict';
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

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
  publicPath: '/app/mobile/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://slqh.cnqos.com/',
        // target: 'http://47.92.68.38:8000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      }
    }
  },
  configureWebpack: (config) => {
    config.externals = {
      'Vue': 'Vue',
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter'
    };
  },
  chainWebpack (config) {
    config.plugins.delete('preload'); // TODO: need test
    config.plugins.delete('prefetch'); // TODO: need test
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end();
          config
            .optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // only package third parties that are initially dependent
              },
              canknow: {
                name: 'chunk-canknow', // split elementUI into a single package
                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                test: /[\\/]node_modules[\\/]_?canknow-m(.*)/ // in order to adapt to cnpm
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // can customize your rules
                minChunks: 3, //  minimum common number
                priority: 5,
                reuseExistingChunk: true
              }
            }
          });
          config.optimization.runtimeChunk('single');
        }
      );
  }
};
