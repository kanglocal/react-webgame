const path = require('path'); 
const { webpack } = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
//process.env.NODE_ENV = 'production';  // 배포시 필요함.

module.exports = {
    name: 'tic-tac-toe-setting',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client'],
    },

    module: {
        rules: [{ 
            test: /\.jsx?$/, 
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                ], 
                plugins: [
                    // '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ]
            },
        }],
    },
    plugins: [
        new RefreshWebpackPlugin()

    ],
    output: {
        path: path.join(__dirname, 'dist'), 
        filename: 'app.js',
        publicPath: '/dist/',
    },
   
    devServer: { 
        devMiddleware: { publicPath: '/dist'}, 
        static: { directory: path.resolve(__dirname) },
        hot: true,
    }

};