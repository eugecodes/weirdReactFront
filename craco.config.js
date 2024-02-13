// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CracoAliasPlugin, configPaths } = require("react-app-alias");
const aliasMap = configPaths("./tsconfig.paths.json");

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        alias: aliasMap
      }
    }
  ],
  eslint: {
    mode: "file"
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.ignoreWarnings = [/Failed to parse source map/]; // this avoids inversify missing source map warnings
      return webpackConfig;
    }
  },
  babel: {
    plugins: [
      [
        "inline-react-svg",
        {
          svgo: {
            plugins: [
              { name: "removeViewBox", active: false },
              { name: "removeDimensions", active: true }
            ]
          }
        }
      ],
      "babel-plugin-transform-typescript-metadata",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      [
        "styled-components",
        {
          ssr: false,
          displayName: true,
          preprocess: false
        }
      ]
    ]
  }
};
