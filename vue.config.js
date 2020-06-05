const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const uglifyjsPlugin=require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const path = require('path');

let plugin = () => {
  if (process.env.NODE_ENV == 'production') {
    return [
      new CompressionPlugin({
        filename: '[path].gz',
        algorithm: 'gzip',
        test: /\.(js)(\?.*)?$/i,
        threshold: 10240,
        deleteOriginalAssets: false
      }),
      new uglifyjsPlugin({uglifyOptions: {compress: false}}),
      new OptimizeCSSPlugin({}),
      new webpack.DllReferencePlugin({
        context: path.join(__dirname, 'dll'),
        manifest: require('./dll/vue.manifest.json')
      }),
      new webpack.DllReferencePlugin({
        context: path.join(__dirname, 'dll'),
        manifest: require('./dll/coreui.manifest.json')
      }),
      new AddAssetHtmlPlugin([
        {
          filepath: require.resolve(path.resolve(__dirname, 'dll/bootstrapVue.dll.js')),
          outputPath: 'dll',
          publicPath: '/dll'
        },
        {
          filepath: require.resolve(path.resolve(__dirname, 'dll/coreui.dll.js')),
          outputPath: 'dll',
          publicPath: '/dll'
        },
        {
          filepath: require.resolve(path.resolve(__dirname, 'dll/vue.dll.js')),
          outputPath: 'dll',
          publicPath: '/dll'
        }
      ])
    ];
  } else {
    return []
  }
};

// vue.config.js
module.exports = {
  // runtimeCompiler: true
  productionSourceMap: false,
  publicPath: '/',
  lintOnSave: false,
  parallel: require('os').cpus().length > 1,
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': '@/assets',
        '@components': '@/components',
        '@views': '@/views',
        '@api': '@/api'
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'initial',
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /node_module/,
            chunks: 'initial',
            name: 'vendor'
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      }
    },
    externals: {
      'google': 'google',
      // 高德地图
      'AMap': 'AMap',
    },
    plugins: [
    ].concat(plugin()),
    output: {
      filename: process.env.NODE_ENV == 'development' ? '[name].[hash].js': 'js/[name].[hash].js'
    }
  },
  chainWebpack: (config) => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },

  css : {
    extract: process.env.NODE_ENV == 'development' ? false : true,
    loaderOptions : {
      sass: {
        data: `
          @import "@/assets/style/_variable.scss";
        `
      }
    }
  },

  devServer: {
    port: 8081,
    host: '0.0.0.0',
    inline: true,
    publicPath: '/',
    historyApiFallback: true,
    // proxy: {
    //   "/": {
    //     target: process.env.VUE_APP_SERVE,
    //     changeOrigin: true
    //   }
    // }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: []
    }
  }
};
