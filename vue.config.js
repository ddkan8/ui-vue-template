'use strict'
const path = require('path')
const defaultSettings = require('./src/settings')
// 换肤插件
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 网页标题
const name = defaultSettings.title || 'UED Template' // page title

// 服务端口号 port = 8080
// npm run dev OR npm run dev --port = 8080
const port = process.env.port || process.env.npm_config_port || 7521 // dev port

// https://cli.vuejs.org/zh/config/
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/eip-admin-rest': {
        target: `http://192.168.52.92:8443/eip-admin-rest`,
        changeOrigin: true,
        pathRewrite: {
          '^/eip-admin-rest': ''
        }
      }
    }
    // after: require('./mock/mock-server.js')
  },
  css: {
    // 向所有 Sass 样式传入全局变量
    loaderOptions: {
      sass: {
        // @ 是 src 的别名
        data: `@import "~@/assets/styles/common/gc-var.scss";`
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      // build css which contains theme colors
      new ThemeColorReplacer({
        fileName: 'css/theme-colors.[contenthash:8].css',
        matchColors: forElementUI.getElementUISeries(defaultSettings.themeDefault),
        changeSelector: forElementUI.changeSelector
        // isJsUgly: config.isBuild,
      })
    ]
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('packages/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('packages/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    // config
    //   .when(process.env.NODE_ENV !== 'development',
    //     config => {
    //       config
    //         .plugin('ScriptExtHtmlWebpackPlugin')
    //         .after('html')
    //         .use('script-ext-html-webpack-plugin', [{
    //         // `runtime` must same as runtimeChunk name. default is `runtime`
    //           inline: /runtime\..*\.js$/
    //         }])
    //         .end()
    //       config
    //         .optimization.splitChunks({
    //           chunks: 'all',
    //           cacheGroups: {
    //             libs: {
    //               name: 'chunk-libs',
    //               test: /[\\/]node_modules[\\/]/,
    //               priority: 10,
    //               chunks: 'initial' // only package third parties that are initially dependent
    //             },
    //             elementUI: {
    //               name: 'chunk-elementUI', // split elementUI into a single package
    //               priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
    //               test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
    //             },
    //             commons: {
    //               name: 'chunk-commons',
    //               test: resolve('examples/components'), // can customize your rules
    //               minChunks: 3, //  minimum common number
    //               priority: 5,
    //               reuseExistingChunk: true
    //             }
    //           }
    //         })
    //       // config.optimization.runtimeChunk('single')
    //     }
    //   )
  }
}
