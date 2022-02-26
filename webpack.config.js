const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDirectory = path.resolve(__dirname);
const {presets} = require(`${appDirectory}/babel.config.js`);
const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.js$|.tsx?$|ts?$/,
  //test: /\.tsx?$/,
  //test: /\.js?$/,
  resolve: {
    extensions: [".js", ".webpack.js", ".web.js", ".d.ts", ".ts", ".tsx"]
    },
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, 'index.web.js'), // Entry to your application
    path.resolve(__dirname, './src/App.js'), // Change this to your main App file
    path.resolve(__dirname, './node_modules'),
    path.resolve(__dirname, 'src'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['@babel/preset-env',
       '@babel/preset-flow',
       ["@babel/preset-react",
        {"runtime": "automatic"}]
      ],
       "plugins": [
        "@babel/plugin-proposal-class-properties",
      //   ["@babel/plugin-transform-runtime",
      // {
      //   "regenerator": true
      // }
    ]
        // "@babel/transform-runtime"
      //]
      //  "react-native-reanimated/plugin",
      //   ["@babel/plugin-transform-modules-commonjs", {
      //     "allowTopLevelThis": true
      //   }]
       
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
};

const cssLoaderConfiguration = {

   test: /\.css$/,
   use: ["style-loader", "css-loader"] 

}

const ttfLoaderConfiguration = {

    test: /\.ttf$/,
    loader: "url-loader", // or directly file-loader
    include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
}


const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
      esModule: false,
    }
  }
};

module.exports = {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'balance.bundle.js',
  },
  resolve: {
    extensions: ['.web.js','.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js',],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  externals: {
    
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      cssLoaderConfiguration,
      ttfLoaderConfiguration,
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      alias: 
      {
       process: "process/browser"
    } 
  }),
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: JSON.stringify(true),
    }),
  ],
};
