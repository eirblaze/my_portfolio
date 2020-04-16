// filename
const entry_js = 'index.ts'
const dist_js = 'assets/js/bundle.js'
// const dist_css = 'css/style.min.css'

// Path
const entry_path = './src/js/'
const dist_path = '../functions/static/'

// URL
const dev_sv_base_path = '../functions/static'
const dev_sv_js_url    = dist_path.replace(dev_sv_base_path, '') // dev_sv_base_path をルートとして、dist_path へのパスを、URLの形で入力。(最初の一致しか置換されないことを逆手に取って文字列加工)

// Plugins
const path    = require('path')
const webpack = require('webpack')
const merge   = require('webpack-merge')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {

  // var init
  let return_modules = {}
  let arg__ProvidePlugin = {}


  // devtool
  return_modules = merge(return_modules,{
    mode: argv.mode
  })

  // is_dev
  const is_dev = (argv.mode != 'production')

  // source-map
  if (is_dev) {
    return_modules = merge(return_modules,{
      devtool: 'source-map'
    })
  }


  // 入出力
  return_modules = merge(return_modules,{

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
      main: path.resolve(__dirname, entry_path, entry_js),
    },

    // ファイルの出力設定
    output: {
      // 出力ファイル名
      path: path.resolve(__dirname, dist_path),
      filename: dist_js,
    },

  })

  // 拡張子省略
  return_modules = merge(return_modules,{
    resolve: {
      // importの際に拡張子を省略して記述できるようにる。 https://qiita.com/es-row/items/12213f097d0762fa33bf
      // in webpack 2.2 default resolve .js .json - https://github.com/vuejs/vue-loader/issues/685
      extensions: ['*', '.js', '.json', '.mjs', '.ts']
    },
  })


  // Babel + TypeScript
  // [公式](https://babeljs.io/)
  // [【５分でなんとなく理解！】Babel入門](https://qiita.com/Shagamii/items/a87181c22ea777ee2acc)
  return_modules = merge(return_modules,{
    module: {
      rules: [
        {
          test: /\.m?[jt]s$/,
          exclude: /node_modules/, // babelを通さないディレクトリ
          loader: "babel-loader",
        }
      ]
    }
  })


  // webpack-dev-server
  // @see https://webpack.js.org/configuration/dev-server/
  // @see https://qiita.com/riversun/items/d27f6d3ab7aaa119deab
  return_modules = merge(return_modules,{
    output: {
      publicPath: dev_sv_js_url, // バンドルファイルまでのlocalhost上のURLを、ここでも定義しておく。 @see http://mk.hatenablog.com/entry/2017/08/18/020918
    },
    devServer: {

      // たまに出るCORSエラー対策
      headers: {
        "Access-Control-Allow-Origin": "*",
      },

      // サーバー設定
      contentBase       : path.join(__dirname, dev_sv_base_path), // リソース・コンテンツ(htmlファイルなど)と自動読み込み
      port              : 8090,
      public            : 'localhost:8090',
      host              : '0.0.0.0',

      // ページ設定
      openPage          : 'index.html',
      //open: 'Chrome',

      compress          : true,

      // HMR (ホットリロード) 全般設定
      hot: true,
      watchContentBase  : true, // コンテンツベースに置かれたファイル(htmlやcssなど)の変更を監視する
      inline            : true, // オートリフレッシュ(自動再読込)をiframeモードで実行する

      // HMR (ホットリロード) 出力先設定
      publicPath        : dev_sv_js_url, // バンドルにアクセスするためのpublicPathの指定(localhost上のURL)
      filename          : dist_js,

      // // proxy
      // index: '', // specify to enable root proxying
      // proxy: {
      //   context: ['/auth', '/api'],
      //   target: 'http://localhost:8090',
      //   pathRewrite: {
      //     '^/api' : '',
      //     '^/auth' : '',
      //   },
      // }

    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  })


  // jQuery CDN
  return_modules = merge(return_modules,{
    // 外部にホスティングされているjQueryなどのパッケージを読み込んで使用する方法 http://elsur.xyz/webpack-jquery-ways-to-work#jQueryundefined
    // 左側: import * from ~~~ で読み込む ~~~ の名前
    // 右側: 外部にあるグローバル変数みたいな。ここで、jQurey のほうの名前で呼んでるので、WordPressとかでもコンフリクトしない。
    externals: {
      jquery: 'jQuery'
    },
  })

  // 毎回インポートしなくてもいいように
  // インポート扱い＝ファイル内ローカルスコープ＝$を使ってもコンフリクトを起こさない。
  // import * as <左側> from <右側>
  arg__ProvidePlugin = merge(arg__ProvidePlugin,{
    jQuery: "jquery",
         $: "jquery",
  })


  // firebase
  return_modules = merge(return_modules,{
    // https://qiita.com/K-Kachi/items/cff0c7fb1a84640c8ac0
    // ここで注目していただきたいところはexternalsである。firebase以外は素直な感じであるがfirebaseは少し厄介である。firebase/*は読み込まれていれば十分で新たにグローバル変数を作るわけではないので空文字を返している。（憶測だが）firebase-app.jsで作られたグローバル変数firebaseに対してその他のfirebase-*.jsが機能を追加している。このことはアプリケーションの書くときに意識する必要があるので、開発中に謎のエラーに遭遇したら真っ先にfirebaseコードの読み込み関係を疑おう。
    // script(defer='', src='/__/firebase/7.14.0/firebase-auth.js')
    // script(defer='', src='/__/firebase/7.14.0/firebase-database.js')
    // script(defer='', src='/__/firebase/7.14.0/firebase-messaging.js')
    // script(defer='', src='/__/firebase/7.14.0/firebase-storage.js')
    externals: {
      firebase: 'firebase',
      'firebase/auth': '',
      'firebase/database': '',
      'firebase/messaging': '',
      'firebase/storage': '',
    },
  })
  // console.log(return_modules.externals)

  // 毎回インポートしなくてもいいように
  // import * as <左側> from <右側>
  arg__ProvidePlugin = merge(arg__ProvidePlugin,{
    firebase: "firebase",
  })
  // console.log(arg__ProvidePlugin)


  // CSS

  // use配列で指定したLoaderが後ろから順番に適用されます。 @see https://ics.media/entry/17376/
  let css_loaders = []

  // CSS を バンドルに埋める
  css_loaders = [
   ...css_loaders,
   {
     loader: "style-loader",
   },
  ]

  // CSS を 外部に出力する
  // css_loaders = [
  //   ...css_loaders,

  //   // use配列で指定したLoaderが後ろから順番に適用されます。 @see https://ics.media/entry/17376/
  //   // 別ファイルで出すとき
  //   // @see https://github.com/webpack-contrib/mini-css-extract-plugin
  //   // @see https://www.expexp.jp/webpack/
  //   {
  //     loader: MiniCssExtractPlugin.loader,
  //     options: {
  //       // you can specify a publicPath here
  //       // by default it uses publicPath in webpackOptions.output
  //       publicPath: dev_sv_js_url,
  //       filename: dist_css,
  //       hmr: is_dev, // ホットモジュールリロード (HMR)
  //     },
  //   },
  // ]

  css_loaders = [
    ...css_loaders,
    {
      loader: "css-loader",
      options: {
        url: false,
        sourceMap: is_dev, // ソースマップの利用有無
      }
    }
  ]

  // post css
  css_loaders = [
    ...css_loaders,
    {
      loader: "postcss-loader",
      options: {
        sourceMap: is_dev, // PostCSS側もソースマップを設定
      }
    }
  ]

  return_modules = merge(return_modules,{
    module: {
      rules: [
        {
          test: /\.css/,
          use: [
            ...css_loaders,
          ],
        }
      ]
    }
  })
  const sass_loaders = [
    {
      loader: "sass-loader",
      options: {
        sourceMap: is_dev, // ソースマップの利用有無
      }
    }
  ]
  return_modules = merge(return_modules,{
    module: {
      rules: [
        {
          test: /\.s[ac]ss/,
          use: [
            ...css_loaders,
            ...sass_loaders,
          ],
        }
      ]
    }
  })

  // pug
  // [webpackだけでpugをビルドする環境を作る](https://qiita.com/wintyo/items/50e5a95e7dc10f237c5d)
  return_modules = merge(return_modules,{
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                // name: path.resolve(__dirname, dist_path, '[name].html'),
                name: '[name].html',
              }
            },
            'extract-loader',
            {
              loader: 'html-loader',
              options: {
                // attrs: ['img:src', ':data-src']
                attributes: {
                    list: [
                    {
                      tag: 'img',
                      attribute: 'src',
                      type: 'src',
                    },
                    {
                      tag: 'img',
                      attribute: 'data-src',
                      type: 'src',
                    },
                  ],
                },
              }
            },
            {
              loader: 'pug-html-loader',
              options: {
                pretty: true
              }
            }
          ]
        },
      ]
    }
  })

  // TerserPlugin
  return_modules = merge(return_modules,{
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: false, // Must be set to true if using source-maps in production
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            compress: {
              drop_console: true,
            }
          }
        }),
      ],
    }
  })

  // プラグイン
  return_modules = merge(return_modules,{
    plugins: [

      // 毎回インポートしなくてもいいようにするプラグイン。最後に組み立てる。
      new webpack.ProvidePlugin(arg__ProvidePlugin),

      // CSS 別ファイルで出力
      // new MiniCssExtractPlugin({
      //   // Options similar to the same options in webpackOptions.output
      //   // all options are optional
      //   filename: dist_css,
      //   //chunkFilename: '[id].css',
      //   //ignoreOrder: false, // Enable to remove warnings about conflicting order
      // }),
    ]
  })

  //console.log(return_modules);
  return return_modules
}
