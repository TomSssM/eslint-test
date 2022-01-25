const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const postCssNested = require('postcss-nested');

module.exports = {
    core: {
        builder: 'webpack5'
    },
    stories: [`../src/${process.env.STORIES_DIR || ''}**/*.stories.@(ts|tsx)`],
    addons: [
        'storybook-addon-designs',
        '@storybook/addon-storysource',
        '@storybook/addon-actions',
        '@storybook/addon-measure',
        '@storybook/addon-docs',
        '@storybook/addon-controls'
    ],
    framework: '@storybook/react',
    webpackFinal: async (config) => {
        if (!config.resolve) {
            config.resolve = {};
        }
        if (!config.resolve.plugins) {
            config.resolve.plugins = [];
        }
        config.resolve.plugins.push(
            new TsconfigPathsPlugin({
                extensions: config.resolve.extensions,
            })
        );

        config.module.rules = config.module.rules.filter(
            rule => rule.test.toString() !== '/\\.css$/'
        );
        config.module.rules.push({
            test: /\.css$/,
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                postCssNested()
                            ]
                        }
                    }
                }
            ]
        });

        return config;
    }
};
