var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: './src/app.ts',
    output: {
        path: './build/',
        filename: 'poem.bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.styl']
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader'},
            {test: /\.styl$/, loader: 'style-loader!css-loader!autoprefixer-loader!stylus-loader'}
        ]
    },
    plugins: [commonsPlugin]
}