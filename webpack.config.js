const path = require('path');
const copyPlugin = require('copy-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const { get } = require('http');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve('src/popup/popup.tsx'),
        options: path.resolve('src/options/options.tsx'),
    },
    module: {
        rules: [{
            use: 'ts-loader',
            test: /\.tsx?$/,
            exclude: /node_modules/,
        },
        {
            use: ['style-loader', 'css-loader'],
            test: /\.css$/i,
        },
        {
            type: 'asset/resource',
            test: /\.(jpg|png|jpe?g|gif|woff|woff2|eot|tff|svg)$/,
        }
    ]
    },
    plugins: [
        new copyPlugin({
            patterns: [
                {
                    from: path.resolve('src/static'),
                    to: path.resolve('dist')
                }
            ]
        }),
        ...getHtmlPlugins(['popup', 'options'])
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve('dist')
    },
    optimization:{
        splitChunks: {
            chunks: 'all'
        }
    }
}

function getHtmlPlugins(chunks){
    return chunks.map(chunk => new htmlPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk],
    }))
}