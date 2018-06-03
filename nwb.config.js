const path = require('path')
const webpack = require('webpack')
const GitRevision = require('git-revision-webpack-plugin')
const eslintFriendlyFormatter = require('eslint-friendly-formatter')

let proxy = {}
try {
  proxy = require('./proxy.js')
} catch (e) {
  console.info('Proxy not found')
}

const ENV = process.env
const TARGET = ENV.npm_lifecycle_event
const gitRevision = new GitRevision()

const webpackConfig = {
  type: 'react-app',
  webpack: {
    publicPath: TARGET === 'build' ? './' : '/',
    aliases: {
      styles: path.resolve('src/styles'),
      // 公共的工具类、容器和组件
      utils: path.resolve('../utils'),
      containers: path.resolve('../containers'),
      components: path.resolve('../components'),
    },
    rules: {
      babel: {
        test: /\.(js|jsx)$/,
      },
      eslint: {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      graphics: {
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              name: 'assets/img/[name].[hash:7].[ext]',
            },
          },
          ENV.NODE_ENV === 'production'
            ? {
                loader: 'image-webpack-loader',
                query: {
                  bypassOnDebug: true,
                  mozjpeg: {
                    quality: 65,
                    progressive: true,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  optipng: {
                    optimizationLevel: 7,
                  },
                  pngquant: {
                    quality: '65-90',
                    speed: 4,
                  },
                },
              }
            : null,
        ].filter(p => p),
      },
      jpeg: {
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              name: 'assets/img/[name].[hash:7].[ext]',
            },
          },
          ENV.NODE_ENV === 'production'
            ? {
                loader: 'image-webpack-loader',
                query: {
                  bypassOnDebug: true,
                  mozjpeg: {
                    quality: 65,
                    progressive: true,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  optipng: {
                    optimizationLevel: 7,
                  },
                  pngquant: {
                    quality: '65-90',
                    speed: 4,
                  },
                },
              }
            : null,
        ].filter(p => p),
      },
      less: {
        modules: true,
        paths: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
        localIdentName: '[local]',
      },
    },
    define: {
      NPMCOMMAND: JSON.stringify(TARGET),
      PRODUCTION: ENV.NODE_ENV === 'production',
      // COMMIT: JSON.stringify(gitRevision.version()),
      // VERSION: JSON.stringify(ENV.npm_package_version),
    },
    output: {
      libraryTarget: 'umd',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    },
    config: config => {
      if (TARGET === 'build') {
        config.externals = Object.assign({}, config.externals, {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
          mobx: 'mobx',
        })
      }

      return config
    },
    extra: {
      resolve: {
        extensions: ['.js', '.jsx', '.json'],
      },
      plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            target: 'web',
            eslint: {
              formatter: eslintFriendlyFormatter,
            },
          },
        }),
      ],
    },
  },
  devServer: {
    disableHostCheck: true,
    proxy: proxy,
  },
}

if (TARGET === 'build') {
  webpackConfig.webpack.html = {
    minify: {
      caseSensitive: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeAttributeQuotes: false,
      removeComments: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
    },
  }
}

module.exports = webpackConfig
