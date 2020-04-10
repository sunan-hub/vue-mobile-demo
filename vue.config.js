const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
const isProd = process.env.NODE_ENV === 'production'
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    vant: 'Vant',
    axios: 'axios'
  },
  css: [],
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/vant@2.5/lib/vant.min.js'
  ]
}

module.exports = {
  publicPath: process.env.VUE_APP_ROUTE_BASE,
  lintOnSave: true,
  productionSourceMap: !isProd,
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {},
    performance: {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          sourceMap: !isProd,
          terserOptions: {
            compress: {
              drop_console: isProd,
              drop_debugger: isProd
            }
          }
        })
      ]
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    // GraphQL Loader
    svgRule
      .test(/\.svg$/)
      .include.add(resolve('./src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude.add(resolve('./src/assets/icons'))

    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://performance.digitalhainan.com.cn/onecode',
        ws: false,
        changeOrigin: true
      }
    }
  },
  css: {
    sourceMap: process.env.NODE_ENV !== 'production',
    loaderOptions: {
      sass: {
        // 这里的选项会传递给 sass-loader
        prependData: '@import "@/assets/styles/_variables.scss";'
      },
      less: {
        modifyVars: {
          hack: `true; @import "${path.join(__dirname, '/src/assets/styles/vant-theme.less')}";`
        }
      }
    }
  }
}
