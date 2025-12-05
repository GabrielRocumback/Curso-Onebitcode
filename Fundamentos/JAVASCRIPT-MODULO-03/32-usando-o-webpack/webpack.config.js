const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    mode: "development",
    // output: {
    //     path: path.resolve(__dirname, "public"),
    //     filename: "[name].bundle.min.js"
    // },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
}