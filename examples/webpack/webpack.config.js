const path = require("path");
module.exports = {
    entry: './index.js',
    output: {
        filename: '[hash].js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: path.resolve('loaders/loader.js?xyz[]=a'),
                    options: {
                        t: 1
                    }
                }],

            }
        ]
    }
}
