const {mergeConfig} = require("vite");
module.exports = {

    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "storybook-addon-react-router-v6",
        "@storybook/addon-interactions",
        {
            name: `@storybook/preset-scss`,
            options: {
                rule: {
                    test: /(?<!\.module).s[ca]ss$/,
                }
            },
        },
        // module
        {
            name: `@storybook/preset-scss`,
            options: {
                rule: {
                    test: /\.module\.s[ca]ss$/,
                },
                cssLoaderOptions: {
                    modules: {
                        localIdentName: '[name]__[local]--[hash:base64:5]',
                    },
                }
            },
        },
        {
            name: '@storybook/addon-postcss',
            options: {
                cssLoaderOptions: {
                    // When you have splitted your css over multiple files
                    // and use @import('./other-styles.css')
                    importLoaders: 1,
                },
                postcssLoaderOptions: {
                    // When using postCSS 8
                    implementation: require('postcss'),
                },
            },
        },

        "@storybook/preset-scss",
    ],
    "framework": "@storybook/react",
    "core": {
        "builder": "@storybook/builder-vite"
    },

    "features": {
        "storyStoreV7": true,
    },
    async viteFinal(config) {
        return mergeConfig(config, {
            css: {
                preprocessorOptions: {
                    scss: {
                        // Next line will prepend the import in all you scss files as you did with your vite.config.js file

                    },
                },
            },
        });
    },

}
