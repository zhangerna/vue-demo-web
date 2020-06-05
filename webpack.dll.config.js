const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        vue: ['vue/dist/vue.runtime.esm.js', 'vuex', 'vue-router'],
        bootstrapVue: ['bootstrap-vue'],
        coreui: [ 'core-js', 'core-js-compat', 'core-js-pure', 'core-util-is']
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true
            })
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, 'dll'),
        library: 'dll_[name]',
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'dll_[name]',
            path: path.join(__dirname, 'dll', '[name].manifest.json'),
            context: __dirname
        })
    ]
};