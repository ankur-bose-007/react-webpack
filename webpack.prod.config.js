const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin= require('html-webpack-plugin');
const webpack=require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports={
    devtool:'cheap-module-source-map',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
        chunkFilename:'[id].js',
        publicPath:''
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                exclude:/node_modules/,
                use:[
                    { loader: 'style-loader' },
                    { 
                        loader: 'css-loader',
                        options:{
                            importLoaders:1,
                            modules: {
	                            localIdentName: "[name]__[local]___[hash:base64:5]",
	                        }
                        } 
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            plugins:()=>{
                                autoprefixer({
                                    browsers:[
                                        ">1%",
                                        "last 2 versions"
                                    ]
                                })
                            }
                        }
                    }
                ]
            },
            {
                test:/\.(png|jpe?g|gif)$/,
                loader:'url-loader?limit=8000&name=images/[name].[ext]'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:__dirname+'/src/index.html',
            filename:'index.html',
            inject:'body'
        })
    ],
    optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        }
      })
    ]
  }
};